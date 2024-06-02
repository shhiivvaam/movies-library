// backend/routes/playlistRoutes.js
const express = require('express');
const {
    createPlaylist,
    getPlaylists,
    addMovieToPlaylist,
    getPublicPlaylist,
} = require('../controllers/playlistController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createPlaylist).get(protect, getPlaylists);
router.route('/addMovie').post(protect, addMovieToPlaylist);
router.route('/public/:shareableLink').get(getPublicPlaylist);

module.exports = router;
