import Welcome from '../components/Home/Welcome';
import { useState, useEffect } from 'react';
import axios from "axios";
import CurrSong from '../components/Home/CurrSong';
import TopCards from '../components/Home/TopCards';
import SpotifyTrending from '../components/Home/SpotifyTrending';
import LastPlayed from '../components/Home/LastPlayed';

const Home = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Get query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("name");
    const email = queryParams.get("email");
    const followers = queryParams.get("followers");
    const image = queryParams.get("image");
    const id = queryParams.get("id");
    const country = queryParams.get("country");
    const tokenFromQuery = queryParams.get("access_token");

    // Set access token from query parameter if it exists
    if (tokenFromQuery) {
      setAccessToken(tokenFromQuery);
    }

    // Set user data if present in the query parameters
    if (name && email && followers && image && id && country) {
      setUser({
        name,
        email,
        followers,
        image,
        country,
        id,
      });
    }
  }, []);

  const handleConnect = () => {
    // Redirect to the login route to authenticate via Spotify
    window.location.href = "http://localhost:3000/auth/login";
  };


  return (
    <div className='p-5'>
      <div>
        <h1 className='text-3xl font-MontSerat font-extrabold'>Friendify</h1>
        <h1 className='py-2 text-sm font-extralight text-gray-500'>Your personal Spotify tracker</h1>
      </div>
      <Welcome user={user} onConnect={handleConnect} />
      {accessToken ? (
        <div>
          {<CurrSong token={accessToken} />}
          {<LastPlayed token={accessToken}/>}
          {<TopCards token={accessToken}/>}
          {/* {<SpotifyTrending token={accessToken}/>} */}
        </div>
        
      ) : (
        <div className="mt-4 text-gray-500">Please connect your Spotify account</div>
      )}

    </div>
  );
};

export default Home;
