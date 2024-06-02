import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import playlistService from '../../services/playlistService';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Home.css';

const Home = () => {
    const { user, logout } = useContext(AuthContext);
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            playlistService.getPlaylists(user.token).then(setPlaylists);
        } else {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    if (!user) {
        return (
            <div class="welcome-container">
                <h1>Welcome to Movies Library.</h1>
                <h2>Please SignIn!! 🧐</h2>
            </div>

        )
    }

    return (
        <div className="home-container">
            {user && <h1>Welcome to Movies Library, {user.username}!</h1>}
            {/* <button className="logout-button" onClick={handleLogout}>Logout</button> */}
            <div className="actions">
                <Link className="action-link" to="/create-playlist">Create Playlist</Link>
                <Link className="action-link" to="/search">Search Movies</Link>
            </div>
            <h2>Your Playlists</h2>
            <ul className="playlist-list">
                {playlists.map((playlist) => (
                    <li key={playlist._id} className="playlist-item">
                        <Link className="playlist-link" to={`/playlist/${playlist._id}`}>{playlist.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
