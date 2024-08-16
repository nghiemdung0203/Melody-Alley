import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./reducers/reducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        music: musicReducer
    }
})

export default store;   