import { createSlice } from "@reduxjs/toolkit";

const sensorsSlice = createSlice({
  name: "sensors",
  initialState: { 
    sensor: {}
  },
  reducers: {
    addSensor: (state, action) => {
      state.sensor = action.payload;
    },
    // updateLightSensorRedux: (state, action) => {
    //   state.sensorsList = state.sensorsList.map(sensor => 
    //     sensor.id_sensor == action.payload.ID ? { ...sensor, light_data: action.payload.light_data } : sensor
    //   );
    // },
    // updateTempSensorRedux: (state, action) => {
    //   state.sensorsList = state.sensorsList.map(sensor => 
    //     sensor.id_sensor == action.payload.ID ? { ...sensor, temp_data: action.payload.temp_data } : sensor
    //   );
    // },
    deleteSensor: (state, action) => {
      state.sensor = {};
    }
  },
});

export const { addSensor, deleteSensor } = sensorsSlice.actions;
export const sensorsReducers = sensorsSlice.reducer;