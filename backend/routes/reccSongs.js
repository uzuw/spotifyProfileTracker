const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");

router.get("/recommended-tracks", async (req, res) => {
  const accessToken = req.query.accessToken;
  if (!accessToken) {
    return res.status(401).json({ error: "Access Token is required" });
  }

  try {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);

    // Step 1: Fetch 5 recently played tracks
    const recentTracksData = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 5 });

    if (!recentTracksData.body.items.length) {
      return res.status(404).json({ error: "No recent tracks found. Play some songs first!" });
    }

    // Step 2: Extract unique track & artist IDs for recommendation seeds
    const trackSeeds = [
      ...new Set(recentTracksData.body.items.map(item => item.track.id))
    ].slice(0, 5); // Max 5 seed tracks

    const artistSeeds = [
      ...new Set(recentTracksData.body.items.map(item => item.track.artists[0]?.id))
    ].slice(0, 5); // Max 5 seed artists


    console.log("Track Seeds:", trackSeeds);
    console.log("Artist Seeds:", artistSeeds);

    //spotify doesnot allow reccomendations seeds no more


  } catch (err) {
    console.error("❌ Error:", err);
  }
});

module.exports = router;
