const express = require("express");
const axios = require("axios");

const router = express.Router();

// Fetching the top global Spotify playlist
router.get("/topGlobal", async (req, res) => {
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

        // Extract relevant data
        const tracks = response.data.items.map((item) => ({
            name: item.track.name,
            artist: item.track.artists.map((artist) => artist.name).join(", "),
            album: item.track.album.name,
            image: item.track.album.images[0]?.url, // Album cover image
            url: item.track.external_urls.spotify, // Spotify track link
        }));

        res.status(200).json(tracks);
    } catch (error) {
        console.error("Error fetching Spotify playlist:", error.response?.data || error.message);

        if (error.response) {
            if (error.response.status === 401) {
                return res.status(401).json({ error: "Invalid or expired access token" });
            }
            return res.status(error.response.status).json({ error: error.response.data });
        }

        res.status(500).json({ error: "Failed to fetch top global songs" });
    }
});

module.exports = router;
