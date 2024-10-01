const express = require("express");
const router = express.Router();
const { CreatePlaylist } = require("../controllers/Playlist/CreatePlaylist");
const { DeletePlaylist } = require("../controllers/Playlist/DeletePlaylist");
const { AddSongToPlaylist } = require("../controllers/Playlist/AddSongToPlayList.");
const { RemoveSongFromPlaylist } = require("../controllers/Playlist/RemoveSongFromPlaylist");
const { GetPlaylist } = require("../controllers/Playlist/GetPlaylist");
const { GetSongFromPlaylist } = require("../controllers/Playlist/GetSongFromPlaylist");

router.post("/CreatedPlaylist", CreatePlaylist);
router.post("/DeletePlaylist", DeletePlaylist);
router.post("/AddSongToPlaylist", AddSongToPlaylist);
router.post("/RemoveSongFromPlaylist", RemoveSongFromPlaylist);
router.get("/GetPlaylist", GetPlaylist);
router.get("/GetSongFromPlaylist", GetSongFromPlaylist);

module.exports = router;
