import { createSlice } from "@reduxjs/toolkit";

const sensorsSlice = createSlice({
  name: "sensors",
  initialState: { 
    sensorsList: [],
    currentSensor: {},
  },
  reducers: {
    addSensor: (state, action) => {
      state.sensorsList.push(action.payload);
    },
    deleteCurrentSensor: (state, action) => {
      state.sensorsList = [];
    },
  },
});

export const {addSensor, deleteCurrentSensor } = sensorsSlice.actions;
export const sensorsReducers = sensorsSlice.reducer;