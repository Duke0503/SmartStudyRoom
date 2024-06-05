import { createSlice } from "@reduxjs/toolkit";

const devicesSlice = createSlice({
  name: "devices",
  initialState: { 
    devicessList: [],
    currentDevices: {},
  },
  reducers: {
    addDevice: (state, action) => {
      state.devicessList.push(action.payload);
    },
    updateDeviceRedux: (state, action) => {
      console.log("before:", state.devicessList)
      state.devicessList = state.devicessList.map(device => 
        device.ID == action.payload.ID ? { ...device, status: action.payload.status } : device
      );
      console.log("after:", state.devicessList)
    },
    updateLightDeviceRedux: (state, action) => {
      console.log("before:", state.devicessList)
      state.devicessList = state.devicessList.map(device => 
        device.ID == action.payload.ID ? { ...device, light_data: action.payload.light_data } : device
      );
      console.log("after:", state.devicessList)
    },
    updateTempDeviceRedux: (state, action) => {
      console.log("before:", state.devicessList)
      state.devicessList = state.devicessList.map(device => 
        device.ID == action.payload.ID ? { ...device, temp_data: action.payload.temp_data } : device
      );
      console.log("after:", state.devicessList)
    },
    deleteCurrentDevice: (state, action) => {
      state.devicessList = [];
    },
  },
});

export const {addDevice, deleteCurrentDevice, updateDeviceRedux, updateLightDeviceRedux, updateTempDeviceRedux } = devicesSlice.actions;
export const devicesReducers = devicesSlice.reducer;