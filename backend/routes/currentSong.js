const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const router = express.Router();

// Making the current song route
router.get('/currently-playing', async (req, res) => {
    const accessToken = req.query.accessToken;

    if (!accessToken) {
        return res.status(401).json({ error: "Access Token is required" });
    }

    try {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(accessToken);

        const response = await spotifyApi.getMyCurrentPlaybackState();

        if (!response.body || !response.body.is_playing) {
            return res.json({
                playing: false,
                message: "No song is currently playing"
            });
        }

        const track = response.body.item;
        res.json({
            playing: true,
            name: track.name,
            artist: track.artists.map(artist => artist.name).join(","),
            album: track.album.name,
            albumArt: track.album.images[0]?.url,
            progress: response.body.progress_ms,
            duration: track.duration_ms,
        });
    } catch (err) {
        console.log("Error fetching the current song: ", err);
        res.status(500).json({
            error: "Failed to fetch current song",
            details: err.message
        });
    }
});

module.exports = router;
