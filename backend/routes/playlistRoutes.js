const express = require("express");
const axios = require("axios");

const router = express.Router();

// Fetching the top global Spotify playlist
router.get("/top-global", async (req, res) => {
    const accessToken = req.query.accessToken;

    if (!accessToken) {
        return res.status(401).json({ error: "Access Token is required" });
    }

    try {
        const playlistId = "37i9dQZEVXbMDoHDwVN2tF"; // Top 50 Global playlist ID
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching Spotify playlist:", error.response?.data || error.message);

        // Check for token expiration error
        if (error.response && error.response.status === 401) {
            return res.status(401).json({ error: "Invalid or expired access token" });
        }

        res.status(500).json({ error: "Failed to fetch top global songs" });
    }
});

module.exports = router;
