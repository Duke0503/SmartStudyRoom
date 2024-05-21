import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
const profileSlice = createSlice({
  name: "profile",
  initialState: { 
    token: "",
    id: "",
    email: "",
    name: "",
    birthday: "",
    phone_number: "",
    gender: "",
  },
  reducers: {
    addUser: (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.birthday = action.payload.birthday;
      state.phone_number = action.payload.phone_number;
      state.gender = action.payload.gender;
      // state = action.payload;
    },
    updateUser: (state, action) => {
      state.name = action.payload.name;
      state.birthday = action.payload.birthday;
      state.phone_number = action.payload.phone_number;
      state.gender = action.payload.gender;
      // state = action.payload;
    },
    deleteUser: (state, action) => {
      state.id = "";
      state.token = "";
      state.email = "";
      state.name = "";
      state.birthday = "";
      state.phone_number = "";
      state.gender = "";
      // state = action.payload;
    },

  },
});

export const { addUser, deleteUser, updateUser } = profileSlice.actions;

export const profileReducers = profileSlice.reducer;