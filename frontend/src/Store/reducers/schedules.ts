import { createSlice } from "@reduxjs/toolkit";

const schedulesSlice = createSlice({
  name: "schedules",
  initialState: { 
    scheduelesList: [],
    currentSchedule: {},
  },
  reducers: {
    fetchSchedule: (state, action) => {
      state.scheduelesList = action.payload;
    },
    addSchedule: (state, action) => {
      state.scheduelesList.push(action.payload);
    },
    updateSchedule: (state, action) => {
      const index = state.scheduelesList.map(schedule => schedule.ID).indexOf(action.payload.schedule_ID);

      state.scheduelesList[index] = action.payload.params;
      state.currentSchedule = action.payload.params;
    },
    deleteSchedule: (state, action) => {
      const index = state.scheduelesList.map(schedule => schedule.ID).indexOf(action.payload.schedule_ID);

      state.scheduelesList.splice(index, 1);
      
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

export const { fetchSchedule, addSchedule, updateSchedule, deleteSchedule, updateCurrentSchedule, deleteCurrentSchedule } = schedulesSlice.actions;
export const schedulesReducers = schedulesSlice.reducer;