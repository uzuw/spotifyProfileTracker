const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const User = require("../models/User");
const router = express.Router();

router.get("/user", async (req, res) => {
  const accessToken = req.query.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      error: "Access token is required",
    });
  }

  try {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
    
    // Set access token
    spotifyApi.setAccessToken(accessToken);

    // Fetch user data
    const userData = await spotifyApi.getMe();

    res.json({
      name: userData.body.display_name,
      birthDate: userData.body.birthdate,
      email: userData.body.email,
      followers: userData.body.followers.total,
      profileImage: userData.body.images?.[0]?.url,
      country: userData.country,
      id:userData.body.id,
    });
  } catch (e) {
    console.error("Error fetching the user data:", e.message);

    // Check if token expired
    if (e.body?.error?.status === 401) {
      return res.status(401).json({
        error: "Access token expired or invalid",
      });
    }

    res.status(500).json({
      error: "Failed to fetch the user profile",
    });
  }
});

module.exports = router;
