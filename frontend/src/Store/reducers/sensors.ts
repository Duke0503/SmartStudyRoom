import { Schedule } from "@/Screens/Schedule/Schedule";
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
    updateLightSensor: (state, action) => {
      state.sensorsList = state.sensorsList.map(sensor => 
        sensor.id_sensor == action.payload.ID ? { ...sensor, light_data: action.payload.light_data } : sensor
      );
    },
    deleteCurrentSensor: (state, action) => {
      state.sensorsList = [];
    },
  },
});

export const {addSensor, deleteCurrentSensor, updateLightSensor } = sensorsSlice.actions;
export const sensorsReducers = sensorsSlice.reducer;