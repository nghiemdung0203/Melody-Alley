const Playlist = require("../../models/Playlist");
const PlaylistSong = require("../../models/PlaylistSong");
const Song = require("../../models/Songs");

module.exports.AddSongToPlaylist = async (req, res) => {
  const { PlaylistID, SongID } = req.body;
  console.log(PlaylistID, SongID);

  try {
    const playlist = await Playlist.findById(PlaylistID);
    const song = await Song.findById(SongID);

    if (!playlist || !song) {
      return res.status(404).json({ message: "Playlist or Song not found" });
    }

    const playlistSong = new PlaylistSong({
      PlaylistID,
      SongID,
      CreatedAt: new Date(),
    });

    await playlistSong.save();

    return res.status(201).json({ message: "Song added to playlist successfully" });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      // Handle the duplicate key error
      return res.status(409).json({ message: "Song is already in the playlist" });
    }
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};