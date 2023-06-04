import {configureStore} from "@reduxjs/toolkit"
import musicReducer from "./musicSlice"
import LikedSongReducer from "./LikedSong"

export const store = configureStore({
    reducer: {
        music: musicReducer,
        LikedSong: LikedSongReducer
    }
})


