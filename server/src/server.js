const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Path to Unity builds inside server/public/unity
const unityPath = path.join(__dirname, "../public/unity");

// Serve Unity builds with Brotli support
app.get("/unity/:project/Build/:file", (req, res) => {
  const { project, file } = req.params;
  const filePath = path.join(unityPath, project, "Build", file);
  const brFilePath = filePath + ".br";

  if (fs.existsSync(brFilePath)) {
    res.setHeader("Content-Encoding", "br");
    res.setHeader("Content-Type", getContentType(file));
    return res.sendFile(brFilePath);
  }

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", getContentType(file));
    return res.sendFile(filePath);
  }

  res.status(404).send("File not found");
});

// MIME type mapping for Unity builds
function getContentType(file) {
  if (file.endsWith(".js") || file.endsWith(".js.unityweb")) return "application/javascript";
  if (file.endsWith(".wasm") || file.endsWith(".wasm.unityweb")) return "application/wasm";
  if (file.endsWith(".data") || file.endsWith(".data.unityweb")) return "application/octet-stream";
  if (file.endsWith(".json")) return "application/json";
  return "application/octet-stream";
}

// Health check
app.get("/", (req, res) => {
  res.send("✅ Backend is running and ready to serve Unity builds");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
