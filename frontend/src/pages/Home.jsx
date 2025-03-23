import Welcome from '../components/Home/Welcome';
import CurrSong from '../components/Home/CurrSong';
import TopCards from '../components/Home/TopCards';
import SpotifyTrending from '../components/Home/SpotifyTrending';
import LastPlayed from '../components/Home/LastPlayed';

const Home = ({ token, user, onConnect }) => {
  return (
    <div className="p-5">
      <Welcome user={user} onConnect={onConnect} />
      {token ? (
        <div>
          <CurrSong token={token} />
          <LastPlayed token={token} />
          <TopCards token={token} />
          <SpotifyTrending token={token} />
        </div>
      ) : (
        <div className="mt-4 text-gray-500">Please connect your Spotify account</div>
      )}
    </div>
  );
};

export default Home;
