import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TopCards = ({ token }) => {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Fetching top artists
    fetch(`http://localhost:3000/stats/top-artists?accessToken=${token}`)
      .then((response) => response.json())
      .then((data) => {
        setTopArtists(data.items);  // Use "items" for top artists data
      })
      .catch((err) => {
        console.error('Error fetching top artists:', err);
      });

    // Fetching top tracks
    fetch(`http://localhost:3000/stats/top-tracks?accessToken=${token}`)
      .then((response) => response.json())
      .then((data) => {
        setTopTracks(data.items);  // Assuming your response has a "topTracks" key
      })
      .catch((err) => {
        console.error('Error fetching top tracks:', err);
      })
      .finally(() => setLoading(false));  // Set loading to false once both requests are done
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleArtistClick = (url) => {
    window.open(url, '_blank');
  };

  const handleTrackClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col p-5 bg-white text-black border border-gray-200 rounded-2xl my-20 shadow-lg shadow-gray-100">
      <h1 className="font-bold text-4xl py-5 px-5 font-DmSans bg-gray-100 bg-gradient-to-t from-white to-gray-100 rounded-2xl">
        YOUR TOP 5's
      </h1>
      <div className="p-5">
        {/* Display top artists */}
        <h2 className="text-2xl text-green-500 font-bold font-spaceMono mb-5">Artists</h2>
        <h2 className="text-md text-gray-400 font-light font-DmSans pb-10">
          You've been loving these artists for the past month
        </h2>

        <div className="flex flex-wrap gap-4">
          {topArtists.slice(0, 5).map((artist, index) => (
            <div
              onClick={() => handleArtistClick(artist.external_urls.spotify)}
              key={index}
              className="w-1/4 sm:w-1/3 lg:w-1/6 p-4 rounded-2xl inset-shadow-2xs hover:bg-[#e3e3e34e] hover:scale-98 transition-transform"
            >
              <h1 className="py-2 text-xl font-bold"># {index + 1}</h1>
              <img
                src={artist.images[0]?.url} // Using the highest resolution image
                alt={artist.name}
                className="w-20 h-20 rounded-full mx-auto mb-2"
              />
              <p className="font-semibold py-1 text-center">{artist.name}</p>
              <p className="text-sm text-gray-600 py-2 text-center">
                Followers: {artist.followers.total}
              </p>
            </div>
          ))}
        </div>
        <Link to="/top-artists">
          <button className="mt-10 px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition duration-300">
            View More
          </button>
        </Link>

        {/* Display top tracks */}
        <h2 className="text-2xl text-green-500 font-bold font-spaceMono mt-20 mb-5">Tracks</h2>
        <h2 className="text-md text-gray-400 font-DmSans pb-10">
          You have been playing these songs on repeat for the past month.
        </h2>
        <div className="flex flex-wrap gap-4">
          {topTracks.slice(0, 5).map((track, index) => (
            <div
              onClick={() => handleTrackClick(track.external_urls.spotify)}
              key={index}
              className="w-1/2 sm:w-1/3 lg:w-1/6 p-4 rounded-2xl inset-shadow-xs text-left hover:bg-[#e3e3e34e] hover:scale-98 transition-transform"
            >
              <h1 className="py-2 text-xl font-bold"># {index + 1}</h1>
              <img
                src={track.album.images[0]?.url} // Using the highest resolution image
                alt={track.name}
                className="w-20 h-20 rounded-2xl object-cover mb-4"
              />
              <p className="py-2 font-semibold">{track.name}</p>
              <p className="text-sm text-gray-600">{track.album.artists[0]?.name}</p>
            </div>
          ))}
        </div>
        <Link to="/top-songs">
          <button className="mt-10 px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition duration-300">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopCards;
