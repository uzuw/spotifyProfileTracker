import { useEffect, useState } from "react";

const TrendingSongs = ({ token }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchTrendingSongs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/topGlobal?accessToken=${token}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setSongs(data); // ✅ Update the state correctly
      } catch (error) {
        console.error("Error fetching songs:", error);
        setError("Failed to load songs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingSongs();
  }, [token]);

  if (!token) return <p className="text-red-500">Access Token is required.</p>;
  if (loading) return <p>Loading trending songs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">🔥 Trending Songs</h2>
      <ul className="space-y-4">
        {songs.map((track, index) => (
          <li key={index} className="flex items-center gap-4 bg-gray-100 p-3 rounded-lg shadow-md">
            <img src={track.image} alt={track.name} className="w-14 h-14 rounded-md" />
            <div>
              <p className="text-lg font-semibold">{track.name}</p>
              <p className="text-gray-500">{track.artist}</p>
            </div>
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-blue-500 hover:underline"
            >
              🎵 Listen
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingSongs;
