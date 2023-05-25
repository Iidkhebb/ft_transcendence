import { configureStore } from "@reduxjs/toolkit";
import { socketSlice } from "./socket";
import { profileSlice } from "./profile";

const rootReducer = {
    socket: socketSlice.reducer,
    profile: profileSlice.reducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export const {} = socketSlice.actions;
export const { setProfile } = profileSlice.actions;
export default store;
