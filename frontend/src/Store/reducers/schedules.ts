import { createSlice } from "@reduxjs/toolkit";

const schedulesSlice = createSlice({
  name: "schedules",
  initialState: { 
    scheduelesList: []
  },
  reducers: {
    updateSchedulesList: (state, action) => {
      console.log("RUN", action.payload)
      state.scheduelesList = action.payload
      // state.schedulesList =  action.payload;
    },
    addSchedule: (state, action) => {
      state.scheduelesList.push(action.payload)
    }
  },
});

export const { updateSchedulesList, addSchedule } = schedulesSlice.actions;
export const schedulesReducers = schedulesSlice.reducer;