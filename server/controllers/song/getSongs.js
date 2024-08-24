const cloudinary = require("./cloudinary");
const User = require("../../models/users");
const Song = require("../../models/Songs");
const iconv = require("iconv-lite");
const jsmediatags = require("jsmediatags");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

module.exports.getSpecifySong = async (req, res) => {
  const SongId = req.query.SongId;
  try {
    const song = await Song.findById({ _id: SongId });
    console.log(song);
    if (!song) {
      res.status(404).send("Can't find that song}");
    } else {
      res.status(200).send(song);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.getUploadedSongs = async (req, res) => {
  const { Author_Id } = req.body;
  console.log(Author_Id)
  try {
    Song.find({ AuthorID: Author_Id }).then((result) => {
      const songs = result.map((song) => ({
        id: song._id,
        title: song.titleSong,
        artist: song.AuthorID,
        artwork: song.Thumbnail,
        url: song.url,
      }));
      res.status(200).send(songs);
    });
  } catch (error) {
    res.status(200).send(error.message);
  }
};


module.exports.getTrackInfo = async (req, res) => {
  try {
    const mp3Path = req.file.path;

    // Adjust the font of the originalname
    const originalnameBuffer = Buffer.from(req.file.originalname, "binary");
    console.log(originalnameBuffer)
    const originalname = iconv.decode(originalnameBuffer, "utf-8");
    console.log(originalname)
    const thumbnailDir = "thumbnails";
    const thumbnailPath = path.join(thumbnailDir, `${originalname}.png`);

    // Create the thumbnail directory if it does not exist
    if (!fs.existsSync(thumbnailDir)) {
      fs.mkdirSync(thumbnailDir);
    }



    jsmediatags.read(mp3Path, {
      onSuccess: function (tag) {
        var tags = tag.tags;
        var artist = tags.artist;
        var album = tags.album;
        var title = tags.title;
        var genre = tags.genre;


        const pictureData = Buffer.from(tags.picture.data);

        // Create a new Sharp object from the picture data
        const img = sharp(pictureData);

        // Resize the image and save it to a file
        img.resize(100, 100).toFile(thumbnailPath, (err, info) => {
          if (err) {
            console.error(err);
          } else {
            cloudinary.uploader.upload(thumbnailPath, (error, result) => {
              if (error) {
                return res.status(500).send(error);
              } else {
                fs.unlink(thumbnailPath, (error, res) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("thumbnail unlinked");
                  }
                });
                const newSong = new Song({
                  titleSong: title,
                  Thumbnail: result.secure_url,
                  AuthorID: artist,
                  GenreID: genre,
                });
                if (newSong) {
                  return res.status(200).send(newSong);
                } else {
                  return
                }
              }
            });
          }
        });
      },
      onError: function (error) {
        console.error("Error reading MP3 file:", error);
        res.status(500).send(error.message);
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};


module.exports.uploadSong = async (req, res) => {
  try {
    const { title, artist, thumbnail, genre } = req.body;
    const now = new Date();

    const mp3Path = req.file.path;

    // Upload MP3 file to Cloudinary
    const mp3Upload = await cloudinary.uploader.upload(mp3Path, {
      resource_type: "video",
      format: "mp3",
      public_id: title,
    });

    // Create a new song document
    const newSong = new Song({
      titleSong: title,
      Thumbnail: thumbnail,
      url: mp3Upload.secure_url,
      AuthorID: artist,
      GenreID: genre,
      CreateAt: now,
    });

    const savedSong = await newSong.save();
    return res.status(200).send(savedSong);

  } catch (error) {
    return res.status(500).send(error.message);
  }
};


module.exports.SearchSong = async (req, res) => {
  const { SongName } = req.body;
  try {
    const SearchingSong = await Song.find({
      titleSong: { $regex: SongName, $options: "i" },
    });
    res.status(200).send(SearchingSong);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


module.exports.getTopTrack = async (req, res) => {
  try {
    const topTracks = await Song.find()
      .sort({ listenCount: -1 }) // Sort by listenCount in descending order
      .limit(10) // Limit the results to the top 10
      .select("titleSong listenCount url Thumbnail AuthorID GenreID");
    return res.status(200).json(topTracks);
  } catch (error) {
    return res.status(500).send(error);
  }
}