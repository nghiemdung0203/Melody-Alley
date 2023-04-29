const UserLikeSong = require("../../models/UserLikeSong");

module.exports.LikedSong = (req, res) => {
    const {UserID , SongID} = req.body;
    const Now = new Date();
    try {
        const LikedSong = new UserLikeSong({
            UserID: UserID,
            SongID: SongID,
            CreateAt: Now
        })
        LikedSong.save();
        res.status(200).send(LikedSong);
    } catch (err) {
        res.status(500).send(err.message);
    }
    
}

module.exports.getLikedSong = async (req, res) => {
    const UserID = req.body;
    const LikedSongList = await UserLikeSong.findById(UserID);
    res.status(200).send(LikedSongList)
}