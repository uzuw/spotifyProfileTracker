// Importing necessary libraries
const express = require("express");
const setAccessToken = require("../middleware/spotifyAuth");

const router = express.Router();

// Middleware to check and refresh access token if needed
async function ensureAccessToken(req, res, next) {
  if (!req.spotifyApi.getAccessToken()) {
    try {
      const data = await req.spotifyApi.refreshAccessToken();
      req.spotifyApi.setAccessToken(data.body.access_token);
      console.log("🔄 Access token refreshed");
    } catch (err) {
      console.error("❌ Error refreshing access token:", err);
      return res.status(500).json({ error: "Failed to refresh access token" });
    }
  }
  next();
}

// Fetch top artists
router.get("/top-artists", setAccessToken, ensureAccessToken, async (req, res) => {
  try {
    const data = await req.spotifyApi.getMyTopArtists({ limit: 50 });
    res.status(200).json(data.body);
  } catch (err) {
    console.error("❌ Error fetching top artists:", err);
    res.status(500).json({ error: "Failed to fetch top artists" });
  }
});

// Fetch top tracks
router.get("/top-tracks", setAccessToken, ensureAccessToken, async (req, res) => {
  try {
    const data = await req.spotifyApi.getMyTopTracks({ limit: 50 });
    res.status(200).json(data.body);
  } catch (err) {
    console.error("❌ Error fetching top tracks:", err);
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});

// Fetch last played track
router.get("/last-played", setAccessToken, ensureAccessToken, async (req, res) => {
  try {
    const data = await req.spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 });
    if (!data.body.items || data.body.items.length === 0) {
      return res.status(404).json({ error: "No recently played tracks found" });
    }
    res.status(200).json(data.body);
  } catch (err) {
    console.error("❌ Error fetching last played track:", err);
    res.status(500).json({ error: "Failed to fetch last played track" });
  }
});

// Fetch recently played tracks
router.get("/recently-played", setAccessToken, ensureAccessToken, async (req, res) => {
  try {
    const data = await req.spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 });
    res.status(200).json(data.body);
  } catch (err) {
    console.error("❌ Error fetching recently played tracks:", err);
    res.status(500).json({ error: "Failed to fetch recently played tracks" });
  }
});

// Fetch liked songs
router.get("/liked-songs", setAccessToken, ensureAccessToken, async (req, res) => {
  try {
    const data = await req.spotifyApi.getMySavedTracks({ limit: 100 });
    res.status(200).json(data.body);
  } catch (err) {
    console.error("❌ Error fetching liked songs:", err);
    res.status(500).json({ error: "Failed to fetch liked songs" });
  }
});

// Fetch similar artists
router.get("/similar-artists/:artistId", setAccessToken, ensureAccessToken, async (req, res) => {
  try {
    const { artistId } = req.params;

    // Log artistId to check if it's valid
    console.log(`🔍 Fetching similar artists for artist ID: ${artistId}`);

    const data = await req.spotifyApi.getArtistRelatedArtists(artistId);

    // Handle empty response
    if (!data.body.artists || data.body.artists.length === 0) {
      return res.status(404).json({ error: "No similar artists found" });
    }

    res.status(200).json(data.body);
  } catch (err) {
    console.error("❌ Error fetching similar artists:", err);
    
    // Handle specific Spotify API errors
    if (err.body && err.body.error && err.body.error.status === 404) {
      return res.status(404).json({ error: "Artist not found" });
    }

    res.status(500).json({ error: "Failed to fetch similar artists" });
  }
});

// Exporting the router
module.exports = router;
