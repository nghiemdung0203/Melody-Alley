const express = require('express');
const router = express.Router();
const LikedSong = require('.././controllers/song/LikedSong')



router.get('/getLikedSong', LikedSong.getLikedSong)
router.post('/LikedSong', LikedSong.LikedSong)

module.exports = router;