// frontend/src/components/Movies/SearchMovies.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import movieService from '../../services/movieService';
import { useNavigate } from 'react-router-dom';

const SearchMovies = () => {
    const { user } = useContext(AuthContext);
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await movieService.searchMovies(query, user.token);
            setMovies(res.Search || []);
        } catch (error) {
            console.log('Something went wrong in handleSearch in Search');
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search Movies"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.imdbID}>
                        <img src={movie.Poster} alt={movie.Title} />
                        {movie.Title} ({movie.Year})
                        <button onClick={() => navigate(`/movie/${movie.imdbID}`)}>Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchMovies;
