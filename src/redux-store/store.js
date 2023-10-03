import { configureStore } from "@reduxjs/toolkit";
import characterSlice from "./characterStore";

const store = configureStore({
    reducer: {
     character:characterSlice.reducer,
    },
});

export default store;
