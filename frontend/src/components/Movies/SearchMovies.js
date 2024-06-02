import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import movieService from '../../services/movieService';
import { useNavigate } from 'react-router-dom';
import '../../styles/SearchMovies.css';

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
        <div className="search-movies-container">
            <form onSubmit={handleSearch}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search Movies"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="search-button" type="submit">Search</button>
            </form>
            <ul className="movie-list">
                {movies.map((movie) => (
                    <li key={movie.imdbID} className="movie-item">
                        <img className="movie-poster" src={movie.Poster} alt={movie.Title} />
                        <div>
                            <h3>{movie.Title}</h3>
                            <p>({movie.Year})</p>
                        </div>
                        <button className="details-button" onClick={() => navigate(`/movie/${movie.imdbID}`)}>Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchMovies;
