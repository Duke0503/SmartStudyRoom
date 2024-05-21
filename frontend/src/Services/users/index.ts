import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../base";

export interface User {
  id: number;
  name: string;
  birthday: Date;
  gender: string;
  phone_number: string;
}

export interface Password {
  current_password: string;
  new_password: string;
}

// Define new endpoints for fetching and updating user profile
const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<User, void>({
      query: () => 'users/profile',
    }),

    updateProfile: build.mutation<void, { body: Partial<User> }>({
      query: ({ body }) => ({
        url: 'users/edit/profile',
        method: 'PATCH',
        body,
      }),
    }),

    updatePassword: build.mutation<void, {body: Password }> ({
      query: ({ body }) => ({
        url: 'users/edit/password',
        method: 'PATCH',
        body,
      }),
    })
  }),
  overrideExisting: true,
});

// Export hooks for the new endpoints
export const { useLazyGetProfileQuery, useUpdateProfileMutation, useUpdatePasswordMutation } = userApi;