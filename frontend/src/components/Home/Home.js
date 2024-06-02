// frontend/src/components/Home/Home.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import playlistService from '../../services/playlistService';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const { user, logout } = useContext(AuthContext);
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            playlistService.getPlaylists(user.token).then(setPlaylists);
        } else {
            navigate('/signin');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    return (
        <div>
            {user &&
                <h1> Welcome to Movies Library : {user.username}</h1>
            }
            <button onClick={handleLogout}>Logout</button>
            <h2>Your Playlists</h2>
            <Link to="/create-playlist">Create Playlist</Link>
            <Link to="/search">Search Movies</Link>
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist._id}>
                        <Link to={`/playlist/${playlist._id}`}>{playlist.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
