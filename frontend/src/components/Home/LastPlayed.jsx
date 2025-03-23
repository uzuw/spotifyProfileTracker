import React, { useState, useEffect } from "react";

const LastPlayed = ({ token }) => {
  const [recentTrack, setRecentTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return; // Prevent fetching if token is missing

    setLoading(true);
    fetch(`http://localhost:3000/stats/last-played?accessToken=${token}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setRecentTrack(data.items[0].track); // Get the actual track object
        } else {
          setRecentTrack(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching last played song:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recentTrack) {
    return <div>No recently played song found.</div>;
  }

  return (
    <div className="flex flex-col justify-center h-auto p-10 bg-white text-black border border-gray-200 rounded-2xl my-20 shadow-md shadow-gray-100">
      <div className="flex flex-row justify-between items-center space-y-4">
        <h1 className="text-xl font-semibold">Last song you've played</h1>
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <img
          src={recentTrack.album.images[0]?.url || "placeholder.jpg"}
          alt={recentTrack.name}
          className="w-20 h-20 rounded-lg shadow-md"
        />
        <div>
          <h2 className="text-lg font-medium">{recentTrack.name}</h2>
          <p className="text-gray-500">{recentTrack.artists.map((artist) => artist.name).join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default LastPlayed;
