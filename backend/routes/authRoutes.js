const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();
const router = express.Router();
const jwt = require("jsonwebtoken");


// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "http://localhost:3000/auth/callback", // Backend handles authentication
});

const generateJWT = (spotifyId) => {
  return jwt.sign({ spotifyId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


// Step 1: Redirect user to Spotify login page
router.get("/login", (req, res) => {
  const scopes = [
    "user-top-read",
    "user-read-recently-played",
    "user-read-private",
    "user-read-email",
    "user-read-currently-playing",
    "user-read-playback-state", // Add this scope
    "playlist-read-collaborative",
    "playlist-read-private",
    "user-library-read",
  ];
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

// Step 2: Handle Spotify callback & exchange code for access token
router.get("/callback", async (req, res) => {
  try {
    const code = req.query.code;

    // Exchange code for access token
    const data = await spotifyApi.authorizationCodeGrant(code);

    // Store the tokens
    spotifyApi.setAccessToken(data.body.access_token);
    spotifyApi.setRefreshToken(data.body.refresh_token);

    // Set tokens in response headers to call in front end
    const accessToken = data.body.access_token;
    const refreshToken = data.body.refresh_token;
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.setHeader("Refresh-Token", refreshToken);
    
    console.log(accessToken)




    // Fetch user profile data
    const userData = await spotifyApi.getMe();
    

    //generating jwt using spoitfy id
    const spotifyId = userData.body.id;
    const token = generateJWT(spotifyId);


    // Construct the URL with query parameters
    const queryParams = new URLSearchParams({
      name: userData.body.display_name || "N/A",
      email: userData.body.email || "N/A", // Spotify API may not return email
      followers: userData.body.followers?.total || 0,
      image: userData.body.images[0]?.url || "N/A",
      id: userData.body.id || "N/A",
      country: userData.body.country || "N/A",
      access_token: accessToken,
      refresh_token: refreshToken,
      jwt: token,
    });

    // Redirect to the frontend with query parameters
    res.redirect(`http://localhost:5173/home?${queryParams.toString()}`);
  } catch (err) {
    console.error("Callback Error:", err);
    res.status(400).json({ error: "Failed to authenticate" });
  }
});

// Step 3: Refresh access token (fix global token issue)
router.get("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.query.refreshToken;

    // Create a new instance to avoid global conflicts
    const tempSpotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      refreshToken: refreshToken,
    });

    const data = await tempSpotifyApi.refreshAccessToken();
    res.json({ accessToken: data.body.access_token });
  } catch (err) {
    console.error("Refresh Token Error:", err);
    res.status(500).json({ error: "Failed to refresh access token" });
  }
});

