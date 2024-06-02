// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const movieRoutes = require('./routes/movieRoutes');
const logger = require('./utils/logger')
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config()

const app = express();
app.use(bodyParser.json())
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
    cors({
        origin: "*",
        // origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/movies', movieRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        logger.error(`Database connection error: ${error.message}`);
    });