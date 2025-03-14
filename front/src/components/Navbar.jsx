import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";

const Navbar = () => {
  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 rounded-2xl shadow-xl flex flex-col items-center space-y-6">
      {/* <NavLink to="/" className="text-gray-300 hover:text-white">
        <HomeIcon fontSize="large" />
      </NavLink>
      <NavLink to="/top-artists" className="text-gray-300 hover:text-white">
        <LibraryMusicIcon fontSize="large" />
      </NavLink>
      <NavLink to="/top-songs" className="text-gray-300 hover:text-white">
        <QueueMusicIcon fontSize="large" />
      </NavLink>
      <NavLink to="/recently-played" className="text-gray-300 hover:text-white">
        <HistoryIcon fontSize="large" />
      </NavLink>
      <NavLink to="/friendify" className="text-gray-300 hover:text-white">
        <GroupIcon fontSize="large" />
      </NavLink> */}
    </nav>
  );
};

export default Navbar;
