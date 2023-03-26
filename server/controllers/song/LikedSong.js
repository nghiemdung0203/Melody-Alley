const UserLikeSong = require("../../models/UserLikeSong");

module.exports.getLikedSong = (req, res) => {
    const {userID , songID} = req.body;
    const Now = new Date();
    try {
        const LikedSong = new UserLikeSong({
            UserID: userID,
            SongID: songID,
            CreateAt: Now
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
    
}   