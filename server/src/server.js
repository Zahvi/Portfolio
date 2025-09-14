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

// helper: content type detection
function getContentTypeByName(name) {
  name = String(name).toLowerCase();
  if (name.endsWith(".js") || name.endsWith(".js.unityweb")) return "application/javascript";
  if (name.endsWith(".wasm") || name.endsWith(".wasm.unityweb")) return "application/wasm";
  if (name.endsWith(".data") || name.endsWith(".data.unityweb")) return "application/octet-stream";
  if (name.endsWith(".json")) return "application/json";
  if (name.endsWith(".css")) return "text/css";
  if (name.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/)) return "image/*";
  return "application/octet-stream";
}

// Wildcard route: supports nested filenames and query strings
app.get("/unity/:project/Build/*", (req, res) => {
  const { project } = req.params;
  const fileInPath = req.params[0]; // everything after /Build/
  const filePath = path.join(unityRoot, project, "Build", fileInPath);

  console.log(`[unity] req: ${req.originalUrl} -> filePath: ${filePath}`);

  // try Brotli variant if client accepts br
  const acceptEncoding = req.headers["accept-encoding"] || "";
  const brPath = filePath + ".br";

  if (acceptEncoding.includes("br") && fs.existsSync(brPath)) {
    res.setHeader("Content-Encoding", "br");
    res.setHeader("Content-Type", getContentTypeByName(fileInPath));
    return res.sendFile(brPath);
  }

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", getContentTypeByName(fileInPath));
    return res.sendFile(filePath);
  }

  console.warn(`[unity] file not found: ${filePath}`);
  return res.status(404).send("File not found");
});

// Optional: health check
app.get("/", (req, res) => {
  res.send("✅ Backend running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
