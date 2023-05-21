import { configureStore, createSlice } from "@reduxjs/toolkit";
import socket from "@/Components/socket/create_socket";

const initialState = {
    socket: socket,
    profile: null,
};

const counterSlice = createSlice({
    name: "socket",
    initialState: initialState,
    reducers: {},
});

const counterSliceProfile = createSlice({
    name: "socket",
    initialState: initialState,
    reducers: {},
});

const store = configureStore({
    reducer: counterSlice.reducer,
});

export const {} = counterSlice.actions;
export const {} = counterSliceProfile.actions;
export default store;
