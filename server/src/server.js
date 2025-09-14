// server/src/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const unityRoot = path.join(__dirname, "../public/unity");

// Helper: MIME type mapping
function getContentType(fileName) {
  if (fileName.endsWith(".js") || fileName.endsWith(".js.unityweb")) return "application/javascript";
  if (fileName.endsWith(".wasm") || fileName.endsWith(".wasm.unityweb")) return "application/wasm";
  if (fileName.endsWith(".data") || fileName.endsWith(".data.unityweb")) return "application/octet-stream";
  if (fileName.endsWith(".json")) return "application/json";
  if (fileName.endsWith(".css")) return "text/css";
  if (fileName.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/)) return "image/*";
  return "application/octet-stream";
}

// Serve Unity builds with Brotli support
app.get("/unity/:project/Build/*", (req, res) => {
  const { project } = req.params;
  const filePathInBuild = req.params[0]; // everything after /Build/
  const filePath = path.join(unityRoot, project, "Build", filePathInBuild);
  const brFilePath = filePath + ".br";

  console.log(`[unity] Requested: ${req.originalUrl} -> ${filePath}`);

  const acceptEncoding = req.headers["accept-encoding"] || "";

  if (acceptEncoding.includes("br") && fs.existsSync(brFilePath)) {
    res.setHeader("Content-Encoding", "br");
    res.setHeader("Content-Type", getContentType(filePathInBuild));
    return res.sendFile(brFilePath);
  }

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", getContentType(filePathInBuild));
    return res.sendFile(filePath);
  }

  console.warn(`[unity] File not found: ${filePath}`);
  res.status(404).send("File not found");
});

// Health check
app.get("/", (req, res) => res.send("✅ Backend running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
