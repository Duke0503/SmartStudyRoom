import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../base";
import { getIpAddress } from "react-native-device-info";
import { addSensor } from "@/Store/reducers";

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
    getProfile: build.query<User, {id: number}>({
      query: (id) => `users/profile/${id}`,
    }),

    updateProfile: build.mutation<User, { body: Partial<User>, id: number }>({
      query: ({ body, id }) => ({
        url: `users/edit/profile/${id}`,
        method: 'PATCH',
        body,
      }),
    }),

    updatePassword: build.mutation<User, {body: Password, id: number }> ({
      query: ({ body, id }) => ({
        url: `users/edit/password/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    addSensor: build.mutation({
      query: ({ user_id, sensor_id }) => ({
        url: `users/edit/addsensor/${user_id}/${sensor_id}`,
        method: 'PATCH',
      }),
    }),
  }),
  overrideExisting: true,
});

// Export hooks for the new endpoints
export const { useLazyGetProfileQuery, useUpdateProfileMutation, useUpdatePasswordMutation, useAddSensorMutation } = userApi;