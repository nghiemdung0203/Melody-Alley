import { createSlice } from "@reduxjs/toolkit";

// reducers/musicReducer.js
const initialState = {
  songs: [],
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.songs.push(action.payload)
    }
  }
})


export const {setSongs} = musicSlice.actions;
export default musicSlice.reducer;
