const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Unity builds root (inside server/public/unity)
const unityRoot = path.join(__dirname, "../public/unity");

function getContentType(fileName) {
  if (fileName.endsWith(".js") || fileName.endsWith(".js.unityweb")) return "application/javascript";
  if (fileName.endsWith(".wasm") || fileName.endsWith(".wasm.unityweb")) return "application/wasm";
  if (fileName.endsWith(".data") || fileName.endsWith(".data.unityweb")) return "application/octet-stream";
  if (fileName.endsWith(".json")) return "application/json";
  if (fileName.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/)) return "image/*";
  return "application/octet-stream";
}

// Serve Unity builds with Brotli + CORS
app.get("/unity/:project/Build/*", (req, res) => {
  const { project } = req.params;
  const filePathInBuild = req.params[0];
  const filePath = path.join(unityRoot, project, "Build", filePathInBuild);
  const brFilePath = filePath + ".br";

  res.setHeader("Access-Control-Allow-Origin", "*"); // CORS
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable"); // cache Unity builds

  const acceptEncoding = req.headers["accept-encoding"] || "";

  // Serve Brotli if available and accepted
  if (acceptEncoding.includes("br") && fs.existsSync(brFilePath)) {
    res.setHeader("Content-Encoding", "br");
    res.setHeader("Content-Type", getContentType(filePathInBuild));
    return res.sendFile(brFilePath);
  }

  // Fallback to normal file
  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", getContentType(filePathInBuild));
    return res.sendFile(filePath);
  }

  console.error("Unity file not found:", filePath);
  res.status(404).send("File not found");
});

// Health check / fallback
app.get("/", (req, res) => res.send("✅ Backend running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
