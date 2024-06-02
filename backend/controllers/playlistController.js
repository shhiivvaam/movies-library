// backend/controllers/playlistController.js
const Playlist = require('../models/playlistModel');
const crypto = require('crypto');
const logger = require('../utils/logger');

exports.createPlaylist = async (req, res) => {
    const { name, isPublic } = req.body;

    try {
        // const shareableLink = isPublic
        //     ? crypto.randomBytes(16).toString('hex')
        //     : null;

        const shareableLink = crypto.randomBytes(16).toString('hex')

        const playlist = new Playlist({
            user: req.user._id,
            name,
            isPublic,
            shareableLink,
        });

        const createdPlaylist = await playlist.save();
        res.status(201).json(createdPlaylist);
    } catch (error) {
        logger.error(`Error creating playlist: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ user: req.user._id });
        res.json(playlists);
    } catch (error) {
        logger.error(`Error fetching playlists: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addMovieToPlaylist = async (req, res) => {
    const { playlistId, movieId } = req.body;

    try {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        if (playlist.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        if (playlist.movies.includes(movieId)) {
            return res.status(400).json({ message: 'Movie already in playlist' });
        }

        playlist.movies.push(movieId);
        await playlist.save();
        res.json(playlist);
    } catch (error) {
        logger.error(`Error adding movie to playlist: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getPublicPlaylist = async (req, res) => {
    const { shareableLink } = req.params;

    try {
        const playlist = await Playlist.findOne({ shareableLink });

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        if (!playlist.isPublic) {
            return res.status(401).json({ message: 'Playlist is private' });
        }

        res.json(playlist);
    } catch (error) {
        logger.error(`Error fetching public playlist: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};
