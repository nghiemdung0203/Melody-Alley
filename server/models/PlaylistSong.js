const mongoose = require("mongoose");

const PlaylistSongSchema = new mongoose.Schema({
  PlaylistID: {type: mongoose.Schema.Types.ObjectId, ref: "Playlist", required: true},
  SongID: {type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true},
  CreatedAt: {type: Date, required: true},
  UpdatedAt: {type: Date}
});

// Add a compound index to ensure uniqueness of PlaylistID and SongID combination
PlaylistSongSchema.index({ PlaylistID: 1, SongID: 1 }, { unique: true });

module.exports = mongoose.model("PlaylistSong", PlaylistSongSchema);