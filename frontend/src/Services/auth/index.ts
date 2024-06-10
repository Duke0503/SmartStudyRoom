import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../base";

const authApi = API.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: ({name, email, password, roles}) => ({
        url: '/auth/register',
        method: 'POST',
        body: {
          "name": name,
          "email": email, 
          "password": password,
          "roles": roles,
        },
      }),
    }),
    loginUser: build.mutation({
      query: ({email, password}) => ({
        url: '/auth/login',
        method: 'POST',
        body: {
          "email": email, 
          "password": password,
        },
      }),
    }),
    forgetPasswordUser: build.query({
      query: (email) => `/auth/email/forgot-password/${email}`,
    }),
  }),
  overrideExisting: true,
});


export const { useRegisterUserMutation, useLoginUserMutation, useForgetPasswordUserQuery, useLazyForgetPasswordUserQuery } = authApi;