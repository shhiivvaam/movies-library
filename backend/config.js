// backend/config.js

require('dotenv').config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'shivam.life2394',
    omdbApiKey: process.env.OMDB_API_KEY || 'c91de7a6',
};
