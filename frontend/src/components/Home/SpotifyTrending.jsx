import { useEffect, useState } from "react";

const TrendingSongs = ({ accessToken }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (!accessToken) return; // Ensure token exists before fetching

    const fetchTrendingSongs = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF", // Top 50 Global playlist
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch songs");

        const data = await response.json();
        setSongs(data.tracks.items); // Extracting track items
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchTrendingSongs();
  }, [accessToken]);

  return (
    <div>
      <h2 className="text-xl font-bold">Trending Songs</h2>
      <ul>
        {songs.map((track, index) => (
          <li key={index}>
            <img src={track.track.album.images[0].url} alt={track.track.name} width="50" />
            {track.track.name} - {track.track.artists[0].name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingSongs;
