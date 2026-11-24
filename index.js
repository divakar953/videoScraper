import { getJson } from "serpapi";
import express from "express";
import path from "path";
import fs from "fs";
import { execFile } from "child_process";
import "dotenv/confit";

const app = express();
const port = 3000;
const __dirname = path.resolve();
const API_KEY = process.env.API_KEY;
const DOWNLOADS_DIR = path.join(__dirname, "downloads");

if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/downloads", express.static(DOWNLOADS_DIR));

app.get("/api/search", async (req, res) => {
  const { q, count = 5 } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required." });
  }

  const response = await getJson({
    engine: "google_short_videos",
    api_key: API_KEY,
    q: q,
    count: count,
  });

  res.json(response);
});

app.post("/api/downloads", (req, res) => {
  const { url, title } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  const safeName = (title || "video")
    .replace(/[^a-z0-9]/gi, "_")
    .substring(0, 60);
  const outputTemplate = path.join(DOWNLOADS_DIR, `${safeName}.%(ext)s`);
  execFile(
    "yt-dlp",
    [
      "-o",
      outputTemplate,
      "--no-playlist",
      "--merge-output-format",
      "mp4",
      url,
    ],
    { timeout: 120000 },
    (error, stdout, stderr) => {
      if (error) {
        console.error("yt-dlp error:", stderr);
        return res.status(500).json({ error: "Failed to download video" });
      }

      const files = fs.readdirSync(DOWNLOADS_DIR);
      const downloaded = files.find((f) => f.startsWith(safeName));

      if (downloaded) {
        res.json({
          success: true,
          filename: downloaded,
          path: `downloads/${downloaded}`,
        });
      } else {
        res.json({
          success: true,
          message: "Download completed but file not found",
        });
      }
    },
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
