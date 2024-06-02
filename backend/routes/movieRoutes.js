const express = require('express');
const { searchMovies } = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/search').get(searchMovies);
// router.route('/search').get(protect, searchMovies);

module.exports = router;
