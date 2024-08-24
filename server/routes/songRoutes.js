const express = require('express');
const songRoutes = require('../controllers/song/getSongs');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });


router.get('/SpecSong', songRoutes.getSpecifySong)
router.post('/songs', songRoutes.getUploadedSongs)
router.post('/createSong', upload.single('song'),songRoutes.getTrackInfo)
router.post('/uploadSong', upload.single('song'),songRoutes.uploadSong)
router.post('/SearchSong', songRoutes.SearchSong)
router.get('/getTopTrack', songRoutes.getTopTrack)

module.exports = router;