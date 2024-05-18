import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
const profileSlice = createSlice({
  name: "profile",
  initialState: { 
    token: "",
    id: "",
    email: "",
    name: "",
  },
  reducers: {
    addUser: (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
      // state = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload.name;
      // state = action.payload;
    },
    deleteProfile: (state, action) => {
      state.id = "";
      state.token = "";
      state.email = "";
      state.name = "";
      // state = action.payload;
    },
    updateUser: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      // state = action.payload;
    },
  },
});

export const { addUser, deleteProfile, updateName, updateUser } = profileSlice.actions;

export const profileReducers = profileSlice.reducer;