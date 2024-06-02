import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from "react-hot-toast";
import playlistService from '../../services/playlistService';
import movieService from '../../services/movieService';
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import '../../styles/Playlist.css';

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

    function copyShareableLink() {
        const shareableLinkElement = document.getElementById('shareable-link');
        const tempInput = document.createElement('input');
        tempInput.value = shareableLinkElement.textContent.trim();
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        toast.success("Link Copied to the Clipboard");
    }


    if (!playlist) return <div><Loader /></div>;

    return (
        <div className="playlist-container">
            <h2>{playlist.name}</h2>
            {/* {playlist.isPublic && (
                <p className="shareable-link">Shareable Link: {window.location.origin}/playlist/public/{playlist.shareableLink}</p>
            )} */}
            {playlist.isPublic && (
                <div className="shareable-link-container">
                    <span className="shareable-link-label">Public Shareable Link :</span>
                    <p className="shareable-link" id="shareable-link">
                        {window.location.origin}/playlist/public/{playlist.shareableLink}
                    </p>
                    <button className="copy-button" onClick={copyShareableLink}>
                        Copy Link
                    </button>
                </div>
            )}

            <ul className="movies-list">
                {movies.map((movie) => (
                    <li key={movie.imdbID} className="movie-item">
                        <img src={movie.Poster} alt={movie.Title} />
                        <div>{movie.Title} ({movie.Year})</div>
                        <p className="movie-plot">{movie.Plot}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
