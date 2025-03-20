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
    <div>
        <h1 className='text-3xl font-MontSerat font-extrabold px-30 pt-10'>Friendify</h1>
        <h1 className=' text-sm font-extralight text-gray-500 px-30 pt-2'>Your personal Spotify tracker</h1>
    
    <Router>
      <div className="relative flex font-Poppins">
        <Navbar/>
        <div className="ml-20 p-6 flex-grow">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/top-artists" element={<TopArtists />} />
            <Route path="/top-songs" element={<TopSongs />} />
            <Route path="/recently-played" element={<RecentlyPlayed />} />
            <Route path="/friendify" element={<Friendify />} />
          </Routes>
        </div>
      </div>
    </Router>
  </div>
  );
}

export default App;
