# Short Video Scraper

A simple web app to search for short videos (YouTube Shorts, Instagram Reels, TikTok, etc.) and download them as `.mp4` files locally.

## How It Works

1. **Search:** Uses **SerpApi** (`google_short_videos`) to fetch video titles, thumbnails, and links without getting blocked by search engine CAPTCHAs.
2. **Download:** Uses **yt-dlp** and **FFmpeg** on the backend to extract and merge the video and audio streams into `.mp4` files saved in `downloads/`.

## Tech Stack

- **Backend:** Node.js, Express
- **Tools:** SerpApi, `yt-dlp`, `ffmpeg`
- **Frontend:** HTML, CSS, JavaScript

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- A [SerpApi](https://serpapi.com/) API key

## Setup & Run

1. **Clone the repo and install dependencies:**
   ```bash
   git clone [https://github.com/divakar953/videoScraper.git](https://github.com/divakar953/videoScraper.git)
   cd videoScraper
   npm install
