import { createSlice } from "@reduxjs/toolkit";

const schedulesSlice = createSlice({
  name: "schedules",
  initialState: { 
    scheduelesList: [],
    currentSchedule: {},
  },
  reducers: {
    addSchedule: (state, action) => {
      state.scheduelesList.push(action.payload);
    },
    updateCurrentSchedule: (state, action) => {
      // state.currentSchedule = action.payload;
      state.currentSchedule = state.scheduelesList.filter(schedule => schedule.ID === action.payload)[0]
    },
    deleteCurrentSchedule: (state, action) => {
      state.currentSchedule = {};
    },
  },
});

export const { addSchedule, updateCurrentSchedule, deleteCurrentSchedule } = schedulesSlice.actions;
export const schedulesReducers = schedulesSlice.reducer;