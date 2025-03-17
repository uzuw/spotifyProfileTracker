import { useState,useEffect } from "react";
import getCurrentlyPlaying from "../../services/getCurrentlyPlaying";

const CurrSong = ({ token }) => {
    console.log('Access Token:', token); // Log the access token
  
    const [song, setSong] = useState(null); // Store the song data
    const [loading, setLoading] = useState(true); // Show loading state
  
    useEffect(() => {
      const fetchCurrentSong = async () => {
        if (token) {
          setLoading(true); // Start loading
  
          const data = await getCurrentlyPlaying(token);
  
          if (data) {
            setSong(data); // Store the song data
          } else {
            setSong(null); // If no song data
          }
  
          setLoading(false); // Stop loading after data is fetched
        } else {
          console.log('No access token provided');
        }
      };
  
      fetchCurrentSong();
    }, [token]); // Run this effect whenever the token changes
  
    if (loading) {
      return <p>Loading...</p>; // Show loading state while fetching
    }
  
    return (
      <div className="flex flex-col justify-center p-5 bg-white text-black border border-gray-200 rounded-2xl my-20 shadow-md shadow-gray-100">
        <h1 className="font-bold text-2xl py-1 px-5 font-Poppins">
            Currently Playing
        </h1>
        {song ? (
          <div className="p-5 flex flex-row items-center w-full max-w-sm lg:max-w-1/2">
          <img
            src={song.albumArt}
            alt={song.name}
            className="w-40 h-40 rounded-2xl object-cover mr-6"
          />
          <div className="flex-1 text-left font-Poppins ml-5 p-4 border-l-3 border-gray-100 rounded-2xl shadow-md shadow-gray-100 "> 
            <p className="text-gray-900 text-2xl">{song.name}</p>
            <p className="text-gray-500 text-lg">{song.artist}</p>
            <p className="text-gray-400 text-sm">{song.album}</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Progress: {Math.floor(song.progress / 1000)}s</p>
              <p>Duration: {Math.floor(song.duration / 1000)}s</p>
            </div>
          </div>
        </div>
        

        ) : (
          <p className="text-center text-lg text-gray-500">No song is currently playing</p>
        )}
      </div>
    );
  };
  
  export default CurrSong;
  