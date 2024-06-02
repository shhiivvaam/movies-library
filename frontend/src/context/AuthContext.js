// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
            axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(userInfo).token}`;
        }
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    };

    const register = async (username, email, password) => {
        const { data } = await axios.post(`${BASE_URL}/api/auth/register`, { username, email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
