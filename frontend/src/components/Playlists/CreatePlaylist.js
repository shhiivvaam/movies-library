// frontend/src/components/Playlists/CreatePlaylist.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import playlistService from '../../services/playlistService';
import { useNavigate } from 'react-router-dom';

const CreatePlaylist = () => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            alert('Please add a name to the PlayList!!')
        } else {
            await playlistService.createPlaylist(name, isPublic, user.token);
            navigate('/');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Playlist Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label>
                Public
                <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
            </label>
            <button type="submit">Create Playlist</button>
        </form>
    );
};

export default CreatePlaylist;
