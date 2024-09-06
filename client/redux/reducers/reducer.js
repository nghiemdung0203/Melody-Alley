import { createSlice } from "@reduxjs/toolkit";

// reducers/musicReducer.js
const initialState = {
  songsArray: [],
  selectedSongIndex: null,
  recentlyTracks: [],
  currentSong: {},
  currentLikedSong: []
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setSongsArray: (state, action) => {
      state.songsArray = action.payload.songsArray; // Set the entire songs array
      state.selectedSongIndex = action.payload.selectedSongIndex; // Set the selectedSongIndex
    },
    setSelectSongIndex: (state, action) => {
      state.selectedSongIndex = action.payload
    },
    setRecentlyTracks: (state, action) => {
      state.recentlyTracks.unshift(action.payload.recentlyTracks);
      state.recentlyTracks = state.recentlyTracks.slice(0, 20);
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload.currentSong
    }, 
    setCurrentLikedSong: (state, action) => {
      state.currentLikedSong.unshift(action.payload.currentLikedSong);
      state.currentLikedSong = state.currentLikedSong.slice(0, 30);
    }
  }
})


export const {setSongsArray, setSelectSongIndex, setRecentlyTracks, setCurrentSong, setCurrentLikedSong} = musicSlice.actions;
export default musicSlice.reducer;
