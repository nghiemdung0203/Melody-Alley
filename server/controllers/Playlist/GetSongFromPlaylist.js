const PlaylistSong = require("../../models/PlaylistSong");

module.exports.GetSongFromPlaylist = async (req, res) => {
  const playlistID = req.query.playlistID;
  try {
    const result = await PlaylistSong.find({ PlaylistID: playlistID })
      .populate({
        path: 'PlaylistID',
        populate: { path: 'AuthorID' }
      })
      .populate({
        path: 'SongID',
        populate: { path: 'AuthorID' }
      })
      .exec();

    if (result.length === 0) {
      return res.status(404).send("No songs found for this playlist");
    }

    // Extract PlaylistID details from the first item
    const playlistDetails = {
      PlaylistID: result[0].PlaylistID,
    };

    // Get an array of SongID details only for the rest
    const songs = result.map(item => ({
      SongID: item.SongID,
    }));

    // Send the response with the playlist info and songs
    res.status(200).send({ playlistDetails, songs });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
