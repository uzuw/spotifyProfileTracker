
import Welcome from '../components/Home/Welcome';
import {useState, useEffect} from 'react';
import axios from "axios";
const Home = () => {

  const [user,setUser]=useState(null);

  useEffect(() => {
    // Check if the user info is in the query parameters from the URL
  const queryParams = new URLSearchParams(window.location.search);
  const name = queryParams.get("name");
  const email = queryParams.get("email");
  const followers = queryParams.get("followers");
  const image = queryParams.get("image");

    if (name && email && followers && image) {
      // If user data is present in query params, set the user state
      setUser({
        name,
        email,
        followers,
        image,
      });
    } else {
      // If user data is not found in query params, try fetching from backend
      axios
        .get("http://localhost:3000/api/user", { withCredentials: true })
        .then((res) => {
          if (res.data.name) setUser(res.data);
        })
        .catch((err) => {
          console.error("Error fetching the user:", err);
        });
    }
  }, []);
  
  const handleConnect = () =>{
    window.location.href = "http://localhost:3000/auth/login";//redirect to the Spotify
  }

  return (
    <div className='p-5'>
      <div>
      <h1 className='text-3xl font-MontSerat font-extrabold'>Friendify</h1>
      <h1 className='py-2 text-sm font-extralight text-gray-500'>Your personal spotify tracker</h1>
      </div>
      <Welcome user={user} onConnect={handleConnect}/>
      
    </div>
  )
}

export default Home
