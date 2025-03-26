
const Welcome = ({user,onConnect,token}) => {//user and handleConnect is passed if its fetched successgully
    
  return (
    <div className="flex flex-col justify-center h-auto p-10 bg-white text-black border-1 border-gray-200 rounded-2xl my-20 shadow-md shadow-gray-100">
    {user?
    //when user is logged in
    <div className="flex flex-row justify-between items-center space-y-4">
      <div className="flex flex-col gap-2 font-spaceMono">
        <h1 className="text-3xl font-bold ">Hi! {user.name}</h1>
        <p className="text-gray-500 ">Email: {user.email} <span className="text-green-400 px-2">{user.country}</span></p> 
        <p className="text-sm text-gray-400 ">You have <span className="text-green-400">{user.followers}</span> followers</p>
        <button
            onClick={() => window.location.href = `https://open.spotify.com/user/${user.id}`}
            className="bg-green-500 hover:bg-green-600 w-50 py-2 my-4 rounded-full text-lg font-bold transition"
            >
            Visit Profile
            </button>
            
      </div>
      
      
      <img
        src={user.image}
        alt="Profile"
        className="w-40 h-40 border-0 border-green-400 rounded-2xl"  // Removed rounded-full class
      />
    </div>
    
    : 

    <div className="text-center space-y-3">
        <h1 className="text-7xl font-bold font-Poppins py-2">Welcome to Spoted</h1>
        <p className="text-gray-300 text-lg py-3">Connect your Spotify to view your Stats</p>
        <button
            onClick={onConnect}
            className="bg-green-500 hover:bg-green-600 my-4 px-6 py-4 rounded-full text-lg font-bold transition"
        >
            Connect to Spotify
        </button>
    </div>

    }  

    </div>
  )
}

export default Welcome


