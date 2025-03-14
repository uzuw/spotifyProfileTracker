import logo from './logo.svg';
import Navbar from '../../components/Navbar.jss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../../pages/Home';
import Friendify from '../../pages/Friendify';
import RecentlyPlayed from '../../pages/RecentlyPlayed';
import TopArtists from '../../pages/TopArtists';
import TopSongs from '../../pages/TopSongs';


function App() {
  return (
    <Router>
    <div className='relative flex'>
      <Navbar/>
      <div className='ml-20 p-6 flex-grow'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/top-artists" element={<TopArtists />} />
        <Route path="/top-songs" element={<TopSongs />} />
        <Route path="/recently-played" element={<RecentlyPlayed />} />
        <Route path="/friendify" element={<Friendify />} />
      </Routes>
    </div>
    </div>
    </Router>
  );
}

export default App;
