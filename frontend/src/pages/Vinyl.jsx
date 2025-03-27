import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

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
    setQuery(""); // Clear input
    setSuggestions({ tracks: [], albums: [] }); // Clear suggestions
  };

  return (
    <div className="h-screen flex items-center justify-center">
      {/* Book Page Container */}
      <div className="w-[40%] bg-white shadow-lg p-8 rounded-lg border border-gray-300">
        <h2 className="text-4xl font-bold text-center mb-9 font-DmSans">Vinyl Collection</h2>

        {/* Search Form */}
        <div className="relative mb-6 flex">
          <input
            type="text"
            placeholder="Track or Album"
            value={query}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded-l-lg font-spaceMono"
          />
          <button className="bg-gray-800 text-white px-4 py-2 rounded-r-lg">Search</button>
          
          {/* Suggestions Dropdown */}
          {suggestions.tracks.length > 0 || suggestions.albums.length > 0 ? (
            <div className="absolute top-full left-0 w-full bg-white border shadow-lg z-10">
              {/* Tracks Section */}
              {suggestions.tracks.length > 0 && (
                <div className="p-2 border-b">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Tracks</p>
                  {suggestions.tracks.map((track, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                      onClick={() => handleSelect(track, "track")}
                    >
                      <img
                        src={track.album.images.length > 0 ? track.album.images[0].url : ""}
                        alt={track.name}
                        className="w-10 h-10 mr-3"
                      />
                      <div>
                        <p className="font-semibold">{track.name}</p>
                        <p className="text-sm text-gray-500">{track.artists.map((a) => a.name).join(", ")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Albums Section */}
              {suggestions.albums.length > 0 && (
                <div className="p-2">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Albums</p>
                  {suggestions.albums.map((album, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                      onClick={() => handleSelect(album, "album")}
                    >
                      <img
                        src={album.images.length > 0 ? album.images[0].url : ""}
                        alt={album.name}
                        className="w-10 h-10 mr-3"
                      />
                      <div>
                        <p className="font-semibold">{album.name}</p>
                        <p className="text-sm text-gray-500">{album.artists[0]?.name || "Unknown"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Added Tracks & Albums List */}
        <div className="overflow-y-auto max-h-[60vh] pt-4">
          {collection.length > 0 ? (
            collection.map((item, index) => (
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
                  <p className="text-gray-300">{item.artist}</p>
                  <p className="text-xs uppercase text-gray-400">{item.type}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No tracks or albums added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vinyl;
