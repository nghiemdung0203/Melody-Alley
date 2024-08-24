import { createSlice } from "@reduxjs/toolkit";


// reducers/musicReducer.js
const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    }
  }
})


export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
