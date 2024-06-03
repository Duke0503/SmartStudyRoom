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
    reset: () => {
      return initialState
    }

  },
});

export const { addSchedule, updateCurrentSchedule, deleteCurrentSchedule, reset } = schedulesSlice.actions;
export const schedulesReducers = schedulesSlice.reducer;