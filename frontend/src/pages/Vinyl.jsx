import React, { useState, useEffect, useRef } from "react";

const Vinyl = ({ token }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState({ tracks: [], albums: [] });
  const [collection, setCollection] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setQuery("");
        setSuggestions({ tracks: [], albums: [] });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    setCollection((prev) => {
      const albumId = type === "album" ? item.id : item.album.id;
      const albumName = type === "album" ? item.name : item.album.name;
      const albumCover = type === "album" ? item.images[0]?.url : item.album.images[0]?.url;
      const artist = type === "album" ? item.artists[0]?.name : item.artists.map((a) => a.name).join(", ");

      let updatedCollection = [...prev];

      const albumIndex = updatedCollection.findIndex((album) => album.id === albumId);
      if (albumIndex !== -1) {
        if (type === "track") {
          const trackExists = updatedCollection[albumIndex].tracks.some((track) => track.id === item.id);
          if (!trackExists) {
            updatedCollection[albumIndex].tracks.push({
              id: item.id,
              name: item.name,
              artist,
            });
          }
        }
      } else {
        updatedCollection.push({
          id: albumId,
          name: albumName,
          cover: albumCover,
          artist,
          tracks: type === "track" ? [{ id: item.id, name: item.name, artist }] : [],
        });
      }

      return updatedCollection;
    });

    setQuery("");
    setSuggestions({ tracks: [], albums: [] });
  };

  return (
    <div className="relative">
      {/* Floating Search Bar */}
      <div ref={dropdownRef} className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[40%] bg-white shadow-lg rounded-lg border-gray-200 z-50">
        <input
          type="text"
          placeholder="Search for a track or album"
          value={query}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-lg text-lg text-gray-800 focus:outline-none"
        />

        {/* Scrollable Suggestions Dropdown */}
        {query && (suggestions.tracks.length > 0 || suggestions.albums.length > 0) && (
          <div className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-lg max-h-80 overflow-y-auto z-50">
            {suggestions.tracks.map((track, index) => (
              <div
                key={index}
                className="p-3 cursor-pointer hover:bg-gray-200 flex items-center"
                onClick={() => handleSelect(track, "track")}
              >
                <img src={track.album.images[0]?.url} alt={track.name} className="w-12 h-12 mr-3 rounded-md" />
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
                <img src={album.images[0]?.url} alt={album.name} className="w-12 h-12 mr-3 rounded-md" />
                <div>
                  <p className="font-semibold">{album.name}</p>
                  <p className="text-sm text-gray-500">{album.artists[0]?.name || "Unknown"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vinyl Collection Grid */}
      <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {collection.map((album) => (
          <div key={album.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <img src={album.cover} alt={album.name} className="w-full h-48 object-cover rounded-md" />
            <div className="mt-3 font-Poppins">
              <p className="font-semibold text-lg">{album.name}</p>
              <p className="text-gray-400">{album.artist}</p>
            </div>
            {album.tracks.length > 0 && (
              <div className="mt-3 border-t border-gray-300 pt-2">
                <p className="text-sm font-semibold">Tracks:</p>
                <ul className="text-sm text-gray-600 font-spaceMono">
                  {album.tracks.map((track) => (
                    <li key={track.id} className="mt-1">{track.name} - {track.artist}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vinyl;
