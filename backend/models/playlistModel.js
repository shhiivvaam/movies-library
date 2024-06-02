// backend/models/playlistModel.js
const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
    movies: [{ type: String }],
    shareableLink: { type: String, unique: false, sparse: true }, // Change here
}, {
    timestamps: true,
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
