import React, { useState, useEffect } from 'react';
import playlistService from '../../services/playlistService';
import movieService from '../../services/movieService';
import { useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import '../../styles/PublicPlayList.css';

const PublicPlaylist = () => {
    const { shareableLink } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchPlaylist = async () => {
            const data = await playlistService.getPublicPlaylist(shareableLink);
            setPlaylist(data);
        };

        const fetchMovies = async () => {
            if (playlist) {
                const moviePromises = playlist.movies.map((movieId) =>
                    movieService.getMovieById(movieId)
                );
                const movies = await Promise.all(moviePromises);
                setMovies(movies.map(res => res));
            }
        };

        fetchPlaylist();
        fetchMovies();
    }, [shareableLink, playlist]);

    if (!playlist) return <div className="loader-container"><Loader /></div>;

    return (
        <div className="playlist-container">
            <h2 className="playlist-title">{playlist.name}</h2>
            <ul className="movie-list">
                {movies.map((movie) => (
                    <li key={movie.imdbID} className="movie-item">
                        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                        <div className="movie-info">
                            <span className="movie-title">{movie.Title}</span>
                            <span className="movie-year">({movie.Year})</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PublicPlaylist;
