// frontend/src/components/Playlists/Playlist.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import playlistService from '../../services/playlistService';
import movieService from '../../services/movieService';
import { useParams } from 'react-router-dom';

const Playlist = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [playlist, setPlaylist] = useState(null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchPlaylist = async () => {
            const data = await playlistService.getPlaylists(user.token);
            const selectedPlaylist = data.find((p) => p._id === id);
            setPlaylist(selectedPlaylist);
        };

        const fetchMovies = async () => {
            if (playlist) {
                const moviePromises = playlist.movies.map((movieId) =>
                    movieService.getMovieById(movieId, user.token)
                );
                const movies = await Promise.all(moviePromises);
                setMovies(movies.map(res => res));
            }
        };

        fetchPlaylist();
        fetchMovies();
    }, [id, user.token, playlist]);

    if (!playlist) return <div>Loading...</div>;

    return (
        <div>
            <h2>{playlist.name}</h2>
            {playlist.isPublic && (
                <p>Shareable Link: {window.location.origin}/playlist/public/{playlist.shareableLink}</p>
            )}
            <ul>
                {movies.map((movie) => (
                    <li key={movie.imdbID}>
                        <img src={movie.Poster} alt={movie.Title} />
                        <div>{movie.Title} ({movie.Year})</div>
                        <p>{movie.Plot}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
