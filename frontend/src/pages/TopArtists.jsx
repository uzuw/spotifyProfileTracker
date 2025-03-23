import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

const TopArtists = ({ token }) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const artistRefs = useRef([]); // Persistent ref array

  useEffect(() => {
    const fetchTopArtists = async () => {
      if (!token) return;
      
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/stats/top-artists?accessToken=${token}`);
        const data = await response.json();
        setArtists(data.items || []);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
      setLoading(false);
    };

    fetchTopArtists();
  }, [token]);

  useLayoutEffect(() => {
    if (artists.length <50) {
      gsap.from(artistRefs.current.filter(el => el), {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, [artists]);

  return (
    <div className="w-full flex flex-col justify-center items-center p-10">
      <h1 className="py-10 mt-10 md:py-20 w-full font-DmSans text-center font-extrabold text-5xl md:text-7xl lg:text-8xl text-black bg-gradient-to-tl from-blue-400 to-pink-200">
        Your Artist Picks
      </h1>

      <h2 className="py-5 text-gray-500 font-spaceMono text-xl">Your top artists are:</h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {artists.map((artist, index) => {
            artistRefs.current[index] = artistRefs.current[index] || null; // Ensure ref is set before rendering
            return (
              <div
                key={artist.id}
                ref={(el) => artistRefs.current[index] = el} // Assign refs dynamically
                className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md transition hover:shadow-lg"
              >
                <img src={artist.images[0]?.url} alt={artist.name} className="w-28 h-28 rounded-full object-cover mb-2" />
                <p className="font-bold text-lg text-center">{artist.name}</p>
                <p className="text-gray-500 text-sm">{artist.followers.total.toLocaleString()} followers</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopArtists;
