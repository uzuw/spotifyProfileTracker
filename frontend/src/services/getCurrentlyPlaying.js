import axios from 'axios';

const getCurrentlyPlaying = async (token) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/currently-playing?accessToken=${token}`);
      
      console.log('Response:', response.data); // Log the response to see if it contains the expected data
  
      if (response.data.playing) {
        return {
          name: response.data.name,
          artist: response.data.artist,
          album: response.data.album,
          albumArt: response.data.albumArt,
          progress: response.data.progress,  // Progress in ms
          duration: response.data.duration,  // Duration in ms
        };
      } else {
        return null; // No song is playing
      }
    } catch (err) {
      console.error("Error fetching current song:", err);
      return null;
    }
  };
  
export default getCurrentlyPlaying;
