import React, { useState, useEffect } from 'react';
import playlistService from '../../services/playlistService';
import movieService from '../../services/movieService';
import { useParams } from 'react-router-dom';

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

    if (!playlist) return <div>Loading...</div>;

    return (
        <div>
            <h2>{playlist.name}</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.imdbID}>
                        <img src={movie.Poster} alt={movie.Title} />
                        <div>{movie.Title} ({movie.Year})</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PublicPlaylist;
