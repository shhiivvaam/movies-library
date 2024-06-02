// frontend/src/services/movieService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const searchMovies = async (query, token) => {
    const response = await axios.get(`${BASE_URL}/api/movies/search`, {
        params: { query },
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const getMovieById = async (id, token) => {
    const response = await axios.get(`${BASE_URL}/api/movies/search`, {
        params: { id },
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export default { searchMovies, getMovieById };