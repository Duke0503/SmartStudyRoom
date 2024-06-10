import { User } from "@/Services/users";
import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  userList: [] as any,
  currentUser: {} as any,
}
const userlistSlice = createSlice({
  name: "listOfUsers",
  initialState,
  reducers: {
    updateManagedUser: (state, action) => {
      state.userList = action.payload.map((updatedUser: any) => {
        const existingUser = state.userList.find((user: any) => user.ID === updatedUser.ID);
        // console.log("updateUser: ", updatedUser);
        // if (existingUser) console.log("existing user: ", existingUser);
        return existingUser ? { ...existingUser, ...updatedUser } : updatedUser;
      });
    },

    // unused
    deleteManagedUser: (state, action: PayloadAction<number>) => {
      // Find the index of the user to be deleted
      state.userList = state.userList.filter(
        (user: any) => user.id !== action.payload
      );
    },

    updateCurrentUser: (state, action: PayloadAction<number>) => {
      try {
        const currentUser = state.userList.find(
          (user: any) => user.ID === action.payload
        );
        state.currentUser = currentUser;
      }
      catch (error) {
        console.log("Failed to update current user", error);
      }
    },

    resetUserList: () => {
      return initialState;
    },

  },
});

export const { updateManagedUser, deleteManagedUser, updateCurrentUser, resetUserList } = userlistSlice.actions;
export const userListReducers = userlistSlice.reducer;