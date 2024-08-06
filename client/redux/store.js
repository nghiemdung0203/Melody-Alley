import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./reducers/reducer";

const store = configureStore({
    reducer: {
        music: musicReducer
    }
})

export default store;   