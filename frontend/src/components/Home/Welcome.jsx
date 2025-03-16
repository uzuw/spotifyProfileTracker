

const Welcome = ({user,onConnect}) => {//user and handleConnect is passed if its fetched successgully
    
  return (
    <div className="flex flex-col justify-center h-auto p-10 bg-white text-black border-1 border-gray-200 rounded-2xl my-20 shadow-md shadow-gray-100">
    {user?
    //when user is logged in
    <div className="flex flex-row justify-between items-center space-y-4">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold py-1">Hi! {user.name}</h1>
        <p className="text-gray-400 py-1">You lit</p>
        <p className="text-sm text-gray-500 py-1">You have {user.followers} followers</p>
      </div>
      
      <img
        src={user.image}
        alt="Profile"
        className="w-40 h-40 border-0 border-green-400 rounded-2xl"  // Removed rounded-full class
      />
    </div>
    
    : 

    <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Friendify</h1>
        <p className="text-gray-300 text-lg">Connect your Spotify to view your Stats</p>
        <button
            onClick={onConnect}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full text-lg font-bold transition"
        >
            Connect to Spotify
        </button>
    </div>

    }  

    </div>
  )
}

export default Welcome


