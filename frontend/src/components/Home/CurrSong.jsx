import { useState, useEffect } from "react";
import getCurrentlyPlaying from "../../services/getCurrentlyPlaying";
import { LinearProgress } from "@mui/material"; // Import Material UI Progress Bar
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const CurrSong = ({ token }) => {
  console.log("Access Token:", token);

  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState(false);

  useEffect(() => {
    const fetchCurrentSong = async () => {
      if (token) {
        setLoading(true);
        const data = await getCurrentlyPlaying(token);
        setSong(data || null);
        setLoading(false);
      }
    };

    fetchCurrentSong();
  }, [next, token]); // 🔥 Run when `token` or `next` changes

  useEffect(() => {
    if (!song || song.progress >= song.duration) {
      setNext((prev) => !prev); // 🔥 Trigger song refresh when the song ends
      return;
    }

    const interval = setInterval(() => {
      setSong((prevSong) => {
        if (!prevSong) return prevSong;

        const newProgress = prevSong.progress + 1000;
        if (newProgress >= prevSong.duration) {
          setNext((prev) => !prev); // ✅ Correctly triggers `useEffect` to fetch a new song
          return { ...prevSong, progress: prevSong.duration };
        }

        return { ...prevSong, progress: newProgress };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [song]); // 🔥 This effect re-runs when `song` changes

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col justify-center p-5 bg-white text-black border-0 border-gray-200 rounded-2xl my-20 shadow-gray-100">
      <h1 className="font-bold text-2xl py-1 px-5 font-Poppins">Currently Playing</h1>
      {song ? (
        <div className="p-5 flex flex-row items-center w-full max-w-sm lg:max-w-full sm:max-w-full">
          <img
            src={song.albumArt}
            alt={song.name}
            className="w-40 h-40 rounded-2xl object-cover mr-6"
          />
          <div className="flex-1 text-left font-Poppins ml-5 p-4 border-l-3 border-gray-100 rounded-2xl shadow-lg shadow-gray-100">
            <p className="text-gray-900 text-2xl">{song.name}</p>
            <p className="text-gray-500 text-lg">{song.artist}</p>
            <p className="text-gray-400 text-sm">{song.album}</p>

            {/* Material UI Progress Bar */}
            <div className="mt-4 w-8/9">
              <LinearProgress
                variant="determinate"
                value={(song.progress / song.duration) * 100}
                sx={{
                  borderRadius:5
                }}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{formatTime(song.progress)}</span>
                <span>{formatTime(song.duration)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-left text-lg text-gray-500 py-10 px-5">No song is currently playing <HeadsetOffIcon fontSize="medium" className="mx-5"/></p>
      )}
    </div>
  );
};

export default CurrSong;
