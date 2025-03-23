import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const TopSongs = ({ token }) => {
  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const songsRefs = useRef([]); // Persistent ref array

  useEffect(() => {
    const fetchTopSongs = async () => {
      if (!token) return;

      setLoading(true);

      try {
        const response = await fetch(`http://localhost:3000/stats/top-tracks?accessToken=${token}`);
        const data = await response.json();
        setTopSongs(data.items || []);
      } catch (error) {
        console.error("Error fetching the top songs:", error);
      }
      setLoading(false);
    };

    fetchTopSongs(); // Call function
  }, [token]);

  useLayoutEffect(() => {
    if (topSongs.length<50) {
      gsap.from(songsRefs.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }
  }, [topSongs]);

  return (
    <div className="w-full flex flex-col justify-center items-center p-10">
      <h1 className="py-10 mt-10 md:py-20 w-full font-DmSans text-center font-extrabold text-5xl md:text-7xl lg:text-8xl text-black bg-gradient-to-tl from-purple-400 to-pink-200">
        Your Song Picks
      </h1>

      <h2 className="py-5 text-gray-500 font-spaceMono text-xl">Your top songs are:</h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {topSongs.map((song, index) => {
            if (!songsRefs.current[index]) songsRefs.current[index] = null;
            return (
              <div
                key={song.id}
                ref={(el) => (songsRefs.current[index] = el)}
                className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md transition hover:shadow-lg"
              >
                <img
                  src={song.album.images[0]?.url}
                  alt={song.name}
                  className="w-28 h-28 rounded-md object-cover mb-2"
                />
                <p className="font-bold text-lg text-center">{song.name}</p>
                <p className="text-gray-500 text-sm">{song.artists.map(artist => artist.name).join(", ")}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopSongs;
