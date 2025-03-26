const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");

const router = express.Router();

// Fetching the top global Spotify playlist
router.get("/topGlobal", async (req, res) => {
    const accessToken = req.query.accessToken;

    if (!accessToken) {
        return res.status(401).json({ error: "Access Token is required" });
    }

    try {
        // Initialize Spotify API
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(accessToken);

        // ✅ Correct method: Get Playlist Tracks (Top Global Playlist ID)
        const playlistId = "37i9dQZEVXbMDoHDwVN2tF"; // Spotify's official "Top Global" playlist

        const data = await spotifyApi.getPlaylistTracks(playlistId, { limit: 5 });

        // ✅ Extract relevant data (track names, artists, URLs)
        const tracks = data.body.items.map(item => ({
            name: item.track.name,
            artist: item.track.artists.map(artist => artist.name).join(", "),
            url: item.track.external_urls.spotify
        }));

        res.status(200).json({ tracks });
    } catch (error) {
        console.error("❌ Error fetching Spotify playlist:", error.body || error.message);

        if (error.body?.error) {
            return res.status(error.body.error.status || 500).json({ error: error.body.error.message });
        }

        res.status(500).json({ error: "Failed to fetch top global songs" });
    }
});

module.exports = router;
