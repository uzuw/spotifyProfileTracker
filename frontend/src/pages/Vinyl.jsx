import React, { useState } from "react";

const Vinyl = ({ token }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [tracks, setTracks] = useState([]);

  const fetchTrackSuggestions = async (searchTerm) => {
    if (!searchTerm) return setSuggestions([]);

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.tracks && data.tracks.items) {
        setSuggestions(data.tracks.items);
      }
    } catch (error) {
      console.error("Error fetching track suggestions:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchTrackSuggestions(value);
  };

  const handleTrackSelect = (track) => {
    setTracks([
      ...tracks,
      {
        name: track.name,
        album: track.album.name,
        cover: track.album.images.length > 0 ? track.album.images[0].url : null,
      },
    ]);
    setQuery(""); // Clear input
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="h-screen flex items-center justify-center">
      {/* Book Page Container */}
      <div className="w-[40%] bg-white shadow-lg p-6 rounded-lg border border-gray-300">
        <h2 className="text-2xl font-semibold text-center mb-4">Vinyl Collection</h2>

        {/* Search Form */}
        <div className="relative mb-6 flex">
          <input
            type="text"
            placeholder="Track"
            value={query}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded-l-lg"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">Search</button>
          
          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border shadow-lg z-10">
              {suggestions.map((track, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                  onClick={() => handleTrackSelect(track)}
                >
                  <img
                    src={track.album.images.length > 0 ? track.album.images[0].url : ""}
                    alt={track.name}
                    className="w-10 h-10 mr-3"
                  />
                  <div>
                    <p className="font-semibold">{track.name}</p>
                    <p className="text-sm text-gray-500">{track.artists.map(a => a.name).join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Added Tracks List */}
        <div className="overflow-y-auto max-h-[60vh] pt-4">
          {tracks.length > 0 ? (
            tracks.map((item, index) => (
              <div
                key={index}
                className="p-4 flex items-center justify-center bg-cover bg-center h-32"
                style={{
                  backgroundImage: item.cover ? `url(${item.cover})` : "none",
                  backgroundColor: item.cover ? "transparent" : "#f3f3f3",
                }}
              >
                <div className="bg-black/70 text-white p-2 text-center rounded-md">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-300">{item.album}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No tracks added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vinyl;
