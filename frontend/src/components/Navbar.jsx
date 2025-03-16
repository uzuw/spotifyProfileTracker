import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 bg-gray-200 bg-opacity-80 backdrop-blur-md p-4 border-gray-100 border-1 rounded-2xl shadow-xl flex flex-col items-center space-y-6">
      <NavLink to="/home" className="text-gray-800 hover:text-gray-400">
        <HomeIcon fontSize="large" />
      </NavLink>
      <NavLink to="/top-artists" className="text-gray-800 hover:text-gray-400">
        <LibraryMusicIcon fontSize="large" />
      </NavLink>
      <NavLink to="/top-songs" className="text-gray-800 hover:text-gray-400">
        <QueueMusicIcon fontSize="large" />
      </NavLink>
      <NavLink to="/recently-played" className="text-gray-800 hover:text-gray-400">
        <HistoryIcon fontSize="large" />
      </NavLink>
      <NavLink to="/friendify" className="text-gray-800 hover:text-gray-400">
        <GroupIcon fontSize="large" />
      </NavLink>
      <a><SettingsIcon fontSize="large" className="text-gray-800 hover:text-gray-400"/></a>
    </nav>
  );
};

export default Navbar;
