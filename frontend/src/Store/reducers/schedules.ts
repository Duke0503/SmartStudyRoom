import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  scheduelesList: [],
  currentSchedule: {},
  averagesData: {},
}
const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
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
      state.currentSchedule = state.scheduelesList.filter(schedule => schedule.ID === action.payload)[0];
    },
    updateAveragesData: (state, action) => {
      state.averagesData = action.payload;
    },
    deleteCurrentSchedule: (state, action) => {
      state.currentSchedule = {};
    },
    deleteAveragesData: (state, action) => {
      state.averagesData = {};
    },
    updateScheduleOfUserID: (state, action) => {      
      state.scheduelesList = action.payload;
    },
    resetSchedule: () => {
      return initialState
    }
  },
});

export const { fetchSchedule, addSchedule, updateSchedule, deleteSchedule, updateCurrentSchedule, deleteCurrentSchedule, updateScheduleOfUserID, resetSchedule, updateAveragesData, deleteAveragesData } = schedulesSlice.actions;
export const schedulesReducers = schedulesSlice.reducer;