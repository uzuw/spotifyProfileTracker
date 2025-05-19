import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import HistoryIcon from "@mui/icons-material/History";
import AlbumIcon from '@mui/icons-material/Album';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 bg-gray-100 bg-opacity-80 backdrop-blur-md p-4 border-gray-200 border rounded-2xl shadow-xl flex flex-col items-center space-y-6">
      <NavLink to="/home" className="text-gray-800 hover:text-gray-600 hover:scale-110 hover:-translate-y-0.5">
        <HomeIcon fontSize="large" />
      </NavLink>
      <NavLink to="/top-artists" className="text-gray-800 hover:text-gray-600 hover:scale-110 hover:-translate-y-0.5">
        <LibraryMusicIcon fontSize="large" />
      </NavLink>
      <NavLink to="/top-songs" className="text-gray-800 hover:text-gray-600 hover:scale-110 hover:-translate-y-0.5">
        <QueueMusicIcon fontSize="large" />
      </NavLink>
      <NavLink to="/recently-played" className="text-gray-800 hover:text-gray-600 hover:scale-110 hover:-translate-y-0.5">
        <HistoryIcon fontSize="large" />
      </NavLink>
      <NavLink to="/vinyl" className="text-gray-800 hover:text-gray-600 hover:scale-110 hover:-translate-y-0.5">
        <AlbumIcon fontSize="large" />
      </NavLink>
      <SettingsIcon fontSize="large" className="text-gray-800 hover:text-gray-600 hover:scale-110 hover:-translate-y-0.5"/>
    </nav>
  );
};

export default Navbar;
