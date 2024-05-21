import { createSlice } from "@reduxjs/toolkit";

const schedulesSlice = createSlice({
  name: "schedules",
  initialState: { 
    scheduelesList: []
  },
  reducers: {
    updateSchedulesList: (state, action) => {
        state.scheduelesList = action.payload

        // state.schedulesList =  action.payload;
      }
  },
});

export const { updateSchedulesList } = schedulesSlice.actions;
export const schedulesReducers = schedulesSlice.reducer;