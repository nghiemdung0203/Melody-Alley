const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { error } = require('console');
require("dotenv").config();

const authRoutes = require('./routes/authRoutes')
const songRoutes = require('./routes/songRoutes')
const likedSongRoutes = require('./routes/LikedSongRoutes')
const commentRoutes = require('./routes/commentRoutes')

const PORT = process.env.PORT || process.env.API_PORT

const app = express();
app.use(express.json());
app.use(cors())

//register routes

app.use('/api/auth', authRoutes)
app.use('/api/song', songRoutes);
app.use('/api/LikedSong', likedSongRoutes)
app.use('/api/comment', commentRoutes)

const server = http.createServer(app);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    server.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    });
})
.catch((error) => {
    console.log(error)
})