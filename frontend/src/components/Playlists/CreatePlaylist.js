import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import playlistService from '../../services/playlistService';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import '../../styles/CreatePlayList.css';

const CreatePlaylist = () => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            toast('You forgot to name the PlayList!! 🫡💀',
                {
                    icon: '🧐',
                    style: {
                        borderRadius: '10px',
                        background: '#fff',
                        color: '#333',
                    },
                }
            );
        } else {
            await playlistService.createPlaylist(name, isPublic, user.token);
            navigate('/');
        }
    };

    return (
        <div className="create-playlist-container">
            <form onSubmit={handleSubmit} className="create-playlist-form">
                <input
                    className="playlist-input"
                    type="text"
                    placeholder="Playlist Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="public-label">
                    Public
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                    />
                </label>
                <button className="create-button" type="submit">Create Playlist</button>
            </form>
        </div>
    );
};

export default CreatePlaylist;
