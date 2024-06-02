// frontend/src/services/playlistService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/playlists`;

const createPlaylist = async (name, isPublic, token) => {
    const config = {
    headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, { name, isPublic }, config);
    return response.data;
};

const getPlaylistById = async (id, token) => {
    const response = await fetch(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
};

const getPlaylists = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);
    return response.data;
};

const addMovieToPlaylist = async (playlistId, movieId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(`${API_URL}/addMovie`, { playlistId, movieId }, config);
    return response.data;
};

const getPublicPlaylist = async (shareableLink) => {
    const response = await axios.get(`${API_URL}/public/${shareableLink}`);
    return response.data;
};

export default {
    createPlaylist,
    getPlaylists,
    getPlaylistById,
    addMovieToPlaylist,
    getPublicPlaylist,
};
