const axios = require('axios');
const logger = require('../utils/logger');

const searchMovies = async (req, res) => {
    const { query, id } = req.query;
    try {
        let response;
        if (query) {
            response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`);
        } else if (id) {
            response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`);
        } else {
            return res.status(400).json({ message: 'Query or Id parameter is required' });
        }

        if (response.data.Response === 'False') {
            return res.status(404).json({ message: 'Movies not found' });
        }
        res.json(response.data);
    } catch (error) {
        logger.error(`Error fetching movies: ${error.message}`);
        res.status(500).json({ message: 'Failed to fetch movies from OMDB', error: error.message });
    }
};

module.exports = { searchMovies };
