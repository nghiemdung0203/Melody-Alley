const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  titleSong : { type: "String", required: true },
  url: { type: "String", required: true },
  Thumbnail: { type: "String", default: "" },
  AuthorID: { type: "String", default: "unknown" },
  PlayCount: { type: "Number", default: 0},
  GenreID: { type: "String", default: "unknown" },
  CreateAt: { type: "Date", required: true },
  UpdateAt: { type: "Date" },
});

module.exports = mongoose.model("Song", songSchema);
