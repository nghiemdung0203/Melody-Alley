const Playlist = require("../../models/Playlist");

module.exports.GetPlaylist = async (req, res) => {
  const UserID = req.query.UserID;
  try {
    await Playlist.find({ AuthorID: UserID }).then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
