import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
const profileSlice = createSlice({
  name: "profile",
  initialState: { 
    token: "",
        id: "",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
  },
  reducers: {
    addUser: (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      // state = action.payload;
  },
  updateName: (state, action) => {
    state.firstName = action.payload.firstName;
    state.lastName = action.payload.lastName;
    // state = action.payload;
  },
  deleteProfile: (state, action) => {
    state.id = "";
    state.token = "";
    state.username = "";
    state.email = "";
    state.firstName = "";
    state.lastName = "";
    // state = action.payload;
  },
  updateUser: (state, action) => {
    state.email = action.payload.email;
    state.firstName = action.payload.firstName;
    state.lastName = action.payload.lastName;
    // state = action.payload;
  },
  },
});

export const { addUser, deleteProfile, updateName, updateUser } = profileSlice.actions;

export const profileReducers = profileSlice.reducer;