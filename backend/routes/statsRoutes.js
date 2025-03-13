// Importing necessary libraries
const express = require("express");
const setAccessToken = require("../middleware/spotifyAuth");

const router = express.Router();

// Fetch top artists
router.get("/top-artists", setAccessToken, async (req, res) => {
  try {
    // Use the Spotify API instance from middleware
    const data = await req.spotifyApi.getMyTopArtists({ limit: 10 });
    res.status(200).json(data.body);
  } catch (err) {
    console.error("Error fetching top artists:", err);
    res.status(500).json({ error: "Failed to fetch top artists" });
  }
});

// Fetch top tracks
router.get("/top-tracks", setAccessToken, async (req, res) => {
  try {
    const data = await req.spotifyApi.getMyTopTracks({ limit: 10 });
    res.json(data.body);
  } catch (err) {
    console.error("Error fetching top tracks:", err);
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});

// Fetch recently played tracks
router.get("/recently-played", setAccessToken, async (req, res) => {
  try {
    const data = await req.spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 });
    res.json(data.body);
  } catch (err) {
    console.error("Error fetching recently played tracks:", err);
    res.status(500).json({ error: "Failed to fetch recently played tracks" });
  }
});

// Exporting the router only once
module.exports = router;
