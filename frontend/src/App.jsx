import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../../frontend/src/components/Navbar";
import Home from "../../frontend/src/pages/Home";
import TopArtists from "../../frontend/src/pages/TopArtists";
import TopSongs from "../../frontend/src/pages/TopSongs";
import RecentlyPlayed from "../../frontend/src/pages/RecentlyPlayed";
import Friendify from "../../frontend/src/pages/Friendify";

function App() {
  return (
    <Router>
      <div className="relative flex">
        <Navbar />
        <div className="ml-20 p-6 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/top-artists" element={<TopArtists />} />
            <Route path="/top-songs" element={<TopSongs />} />
            <Route path="/recently-played" element={<RecentlyPlayed />} />
            <Route path="/friendify" element={<Friendify />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
