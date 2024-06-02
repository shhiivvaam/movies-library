// frontend/src/components/Movies/MovieDetails.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import movieService from '../../services/movieService';
import playlistService from '../../services/playlistService';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [movie, setMovie] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    useEffect(() => {
        const fetchMovie = async () => {
            const res = await movieService.getMovieById(`${id}`, user.token);
            setMovie(res);
        };

        const fetchPlaylists = async () => {
            const data = await playlistService.getPlaylists(user.token);
            console.log('Playlists Data:', data);
            setPlaylists(data);
        };

        fetchMovie();
        fetchPlaylists();
    }, [id, user.token]);

    const handleAddToPlaylist = async (e) => {
        e.preventDefault();
        if (!selectedPlaylist) {
            alert('Select a playlist first!!')
        } else {

            await playlistService.addMovieToPlaylist(selectedPlaylist, id, user.token);
            alert('Movie added to playlist');
            navigate('/');
        }
    };

    if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <h2>{movie.Title} ({movie.Year})</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Plot}</p>
            <select value={selectedPlaylist} onChange={(e) => setSelectedPlaylist(e.target.value)}>
                <option value="">Select Playlist</option>
                {playlists.map((playlist) => (
                    <option key={playlist._id} value={playlist._id}>
                        {playlist.name}
                    </option>
                ))}
            </select>
            <button onClick={handleAddToPlaylist}>Add to Playlist</button>
        </div>
    );
};

export default MovieDetails;
