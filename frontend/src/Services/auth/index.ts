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
    forgetPasswordUser: build.mutation({
      query: ({email}) => `/auth/email/forgot-password/${email}`,
    }),
    OTPUser: build.mutation({
      query: ({token}) => `/auth/email/reset-password/${token}`,
    }),
    resetPasswordUser: build.mutation({
      query: ({email, newPassword, newPasswordToken}) => ({
        url: '/auth/email/reset-password',
        method: 'POST',
        body: {
          "email": email, 
          "newPassword": newPassword,
          "newPasswordToken": newPasswordToken
        },
      }),
    })
  }),
  overrideExisting: true,
});


export const { useRegisterUserMutation, useLoginUserMutation, useForgetPasswordUserMutation, useOTPUserMutation, useResetPasswordUserMutation } = authApi;