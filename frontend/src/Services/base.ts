import { Config } from "@/Config";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseQuery = fetchBaseQuery({ 
  baseUrl: Config.API_URL,
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        headers.set('Authorization', `Bearer ${token}`)
        // console.log(headers)
    }
    
    return headers;
}
});

const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
    console.log(result.error)
  }
  return result;
};

export const API = createApi({
  reducerPath: 'apiMain',
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});