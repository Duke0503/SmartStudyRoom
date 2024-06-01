import { API } from "../base";

const divicesAPI = API.injectEndpoints({
  endpoints: (build) => ({
    getDevice: build.query({
      query: (arg) => {
        const { user_id, type} = arg;
        return `devices/getdevice/${user_id}/${type}`;
      }
    })
  }),
  overrideExisting: true,
});

// Export hooks for the new endpoints
export const { useGetDeviceQuery } = divicesAPI;