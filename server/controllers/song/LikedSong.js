const mongoose = require("mongoose");
const UserLikeSong = require("../../models/UserLikeSong");
const Song = require("../../models/Songs");
const Songs = require("../../models/Songs");

module.exports.LikedSong = (req, res) => {
  const { UserID, SongID } = req.body;
  const Now = new Date();

  const UserLikedSong = UserLikeSong.findOne({
    UserID: mongoose.Types.ObjectId(UserID),
    SongID: mongoose.Types.ObjectId(SongID),
  });

  if (UserLikedSong !== null) {
    res.status(400).send("User Liked this song before");
  } else {
    try {
      const LikedSong = new UserLikeSong({
        UserID: UserID,
        SongID: SongID,
        CreateAt: Now,
      });
      LikedSong.save();
      res.status(200).send(LikedSong);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};

module.exports.getLikedSong = async (req, res) => {
  const { UserID } = req.body;
  const LikedSongList = await UserLikeSong.find({
    UserID: mongoose.Types.ObjectId(UserID),
  });
  const SongIDList = LikedSongList.map((doc) => doc.SongID);
  Songs.find({ _id: { $in: SongIDList } }, (err, songs) => {
    if (err) {
      console.error(err);
      // Handle the error
    } else {
      res.status(200).send(songs)
      // Process the songs retrieved
    }
  });
};
