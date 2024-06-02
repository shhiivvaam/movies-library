// frontend/src/services/authService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/auth`;

const register = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
    } else {
        throw new Error("Errir in auth Service : ", data.message);
    }
    return response.data;
};

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
    } else {
        throw new Error("Error in auth Service : ", data.message);
    }
    return response.data;
};

export default {
    register,
    login,
};