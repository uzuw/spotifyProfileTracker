import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Vinyl = ({ token }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState({ tracks: [], albums: [] });
  const [collection, setCollection] = useState([]);

  const fetchSuggestions = async (searchTerm) => {
    if (!searchTerm) return setSuggestions({ tracks: [], albums: [] });

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track,album&limit=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setSuggestions({
        tracks: data.tracks?.items || [],
        albums: data.albums?.items || [],
      });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSelect = (item, type) => {
    setCollection([
      ...collection,
      {
        name: item.name,
        type,
        artist: type === "track" ? item.artists.map((a) => a.name).join(", ") : item.artists[0]?.name || "Unknown",
        cover: item.images?.length > 0 ? item.images[0].url : item.album?.images[0]?.url || null,
      },
    ]);
    setQuery("");
    setSuggestions({ tracks: [], albums: [] });
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      {/* Fixed Search Bar */}
      <div className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md p-4 flex justify-center items-center z-50">
        <input
          type="text"
          placeholder="Search for a track or album"
          value={query}
          onChange={handleSearchChange}
          className="w-1/2 p-3 border rounded-lg shadow-md text-lg"
        />
      </div>

      {/* Suggestions */}
      {suggestions.tracks.length > 0 || suggestions.albums.length > 0 ? (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1/2 bg-white border shadow-lg z-50">
          {suggestions.tracks.map((track, index) => (
            <div
              key={index}
              className="p-3 cursor-pointer hover:bg-gray-200 flex items-center"
              onClick={() => handleSelect(track, "track")}
            >
              <img src={track.album.images[0]?.url} alt={track.name} className="w-12 h-12 mr-3" />
              <div>
                <p className="font-semibold">{track.name}</p>
                <p className="text-sm text-gray-500">{track.artists.map((a) => a.name).join(", ")}</p>
              </div>
            </div>
          ))}
          {suggestions.albums.map((album, index) => (
            <div
              key={index}
              className="p-3 cursor-pointer hover:bg-gray-200 flex items-center"
              onClick={() => handleSelect(album, "album")}
            >
              <img src={album.images[0]?.url} alt={album.name} className="w-12 h-12 mr-3" />
              <div>
                <p className="font-semibold">{album.name}</p>
                <p className="text-sm text-gray-500">{album.artists[0]?.name || "Unknown"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Vinyl Collection Grid */}
      <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collection.map((item, index) => (
          <div key={index} className="relative bg-gray-200 p-4 rounded-lg shadow-md">
            {item.cover && <img src={item.cover} alt={item.name} className="w-full h-48 object-cover rounded-md" />}
            <div className="mt-3 text-center">
              <p className="font-semibold text-lg">{item.name}</p>
              <p className="text-gray-500">{item.artist}</p>
              <p className="text-xs uppercase text-gray-400">{item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vinyl;
