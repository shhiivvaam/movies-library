import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home/Home';
import CreatePlaylist from './components/Playlists/CreatePlaylist';
import Playlist from './components/Playlists/Playlist';
import PublicPlaylist from './components/Playlists/PublicPlaylist';
import SearchMovies from './components/Movies/SearchMovies';
import MovieDetails from './components/Movies/MovieDetails';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-playlist" element={<CreatePlaylist />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/playlist/public/:shareableLink" element={<PublicPlaylist />} />
          <Route path="/search" element={<SearchMovies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
