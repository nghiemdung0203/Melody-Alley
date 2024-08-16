import { createSlice } from "@reduxjs/toolkit";

// reducers/musicReducer.js
const initialState = {
  songsArray: [],
  selectedSongIndex: null,
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
    }
  }
})


export const {setSongsArray, setSelectSongIndex} = musicSlice.actions;
export default musicSlice.reducer;
