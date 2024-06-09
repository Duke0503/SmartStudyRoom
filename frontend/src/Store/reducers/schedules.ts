import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  scheduelesList: [],
  currentSchedule: {},
}
const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
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
    updateScheduleOfUserID: (state, action) => {      
      state.scheduelesList = action.payload;
    },
    resetSchedule: () => {
      return initialState
    }

  },
});

export const { addSchedule, updateCurrentSchedule, deleteCurrentSchedule, updateScheduleOfUserID, resetSchedule } = schedulesSlice.actions;
export const schedulesReducers = schedulesSlice.reducer;