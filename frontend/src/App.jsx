import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../../frontend/src/components/Navbar";
import Home from "../../frontend/src/pages/Home";
import TopArtists from "../../frontend/src/pages/TopArtists";
import TopSongs from "../../frontend/src/pages/TopSongs";
import RecentlyPlayed from "../../frontend/src/pages/RecentlyPlayed";
import Friendify from "../../frontend/src/pages/Friendify";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromQuery = queryParams.get("access_token");

    if (tokenFromQuery) {
      setAccessToken(tokenFromQuery);
      localStorage.setItem("spotify_token", tokenFromQuery);
    } else {
      const storedToken = localStorage.getItem("spotify_token");
      if (storedToken) {
        setAccessToken(storedToken);
      }
    }

    // Set user data from query params
    const name = queryParams.get("name");
    const email = queryParams.get("email");
    const followers = queryParams.get("followers");
    const image = queryParams.get("image");
    const id = queryParams.get("id");
    const country = queryParams.get("country");

    if (name && email && followers && image && id && country) {
      setUser({ name, email, followers, image, id, country });
    }
  }, []);

  const handleConnect = () => {
    window.location.href = "http://localhost:3000/auth/login";
  };

  return (
    <div>
      <h1 className="text-3xl font-MontSerat font-extrabold px-30 pt-10">Friendify</h1>
      <h2 className="text-sm font-extralight text-gray-500 px-30 pt-2">Your personal Spotify tracker</h2>

      <Router>
        <div className="relative flex font-Poppins">
          <Navbar />
          <div className="ml-20 p-6 flex-grow">
            <Routes>
              <Route path="/home" element={<Home token={accessToken} user={user} onConnect={handleConnect} />} />
              <Route path="/top-artists" element={<TopArtists token={accessToken} />} />
              <Route path="/top-songs" element={<TopSongs token={accessToken} />} />
              <Route path="/recently-played" element={<RecentlyPlayed token={accessToken} />} />
              <Route path="/friendify" element={<Friendify />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
