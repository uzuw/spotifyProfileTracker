const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");

router.get("/recommended-artists", async (req, res) => {
  const accessToken = req.query.accessToken;

  if (!accessToken) {
    return res.status(401).json({ error: "Access Token is required" });
  }

  try {
    // Initialize Spotify API client with the provided access token
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);

    // Step 1: Fetch 10 recently played tracks
    const data = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 10 });

    if (!data.body.items || data.body.items.length === 0) {
      return res.status(400).json({ error: "No recent tracks found" });
    }

    // Step 2: Extract unique artist IDs from recent songs
    const artistIds = [
      ...new Set(data.body.items.flatMap(track => track.track.artists.map(artist => artist.id)))
    ];

    // Ensure there's at least one artist ID to proceed
    if (artistIds.length === 0) {
      return res.status(400).json({ error: "No artists found from recently played tracks" });
    }

    // Step 3: Fetch related artists for the first artist ID
    const firstArtistId = artistIds[0]; // Pick only the first artist
    let recommendedArtists = [];

    try {
      const relatedArtistsData = await spotifyApi.getArtistRelatedArtists(firstArtistId);

      recommendedArtists = relatedArtistsData.body.artists.map(artist => ({
        name: artist.name,
        image: artist.images.length > 0 ? artist.images[0].url : null,
        url: artist.external_urls.spotify
      }));
    } catch (err) {
      console.error(`❌ Error fetching related artists for ID ${firstArtistId}:`, err);
      return res.status(500).json({ error: `Failed to fetch related artists for ${firstArtistId}` });
    }

    // Step 4: Return up to 10 recommended artists
    res.status(200).json({ recommendedArtists: recommendedArtists.slice(0, 10) });
  } catch (err) {
    console.error("❌ Error fetching recommended artists:", err);
    res.status(500).json({ error: "Failed to fetch recommended artists" });
  }
});

module.exports = router;
