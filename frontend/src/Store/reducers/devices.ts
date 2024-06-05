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
      state.devicessList = state.devicessList.map(device => 
        device.ID == action.payload.ID ? { ...device, status: action.payload.status } : device
      );
    },
    updateLightDeviceRedux: (state, action) => {
      state.devicessList = state.devicessList.map(device => 
        device.ID == action.payload.ID ? { ...device, light_data: action.payload.light_data } : device
      );
    },
    updateTempDeviceRedux: (state, action) => {
      state.devicessList = state.devicessList.map(device => 
        device.ID == action.payload.ID ? { ...device, temp_data: action.payload.temp_data } : device
      );
    },
    deleteCurrentDevice: (state, action) => {
      state.devicessList = [];
    },
  },
});

export const {addDevice, deleteCurrentDevice, updateDeviceRedux, updateLightDeviceRedux, updateTempDeviceRedux } = devicesSlice.actions;
export const devicesReducers = devicesSlice.reducer;