import { API } from "../base";

const divicesAPI = API.injectEndpoints({
  endpoints: (build) => ({
    getDevice: build.query({
      query: (arg) => {
        const { user_id, type} = arg;
        return `devices/getdevice/${user_id}/${type}`;
      },
      // onQueryStarted: async (apiRequest, { dispatch, getState }) => {
      //   console.log('getDevice request started:', apiRequest);
      // },
    }),
    updateDevice: build.mutation(
      {
          query: ({device_id, status}) => ({
              url: `/devices/updatedevice/${device_id}`,
              method: "PATCH",
              body: {
                  "status": status
              }
          })
      }
    ), 
    updateLightDevice: build.mutation(
      {
          query: ({device_id, light_data}) => ({
              url: `/devices/updatedevice/${device_id}`,
              method: "PATCH",
              body: {
                  "light_data": light_data
              }
          })
      }
    ), 
    updateTempDevice: build.mutation(
      {
          query: ({device_id, temp_data}) => ({
              url: `/devices/updatedevice/${device_id}`,
              method: "PATCH",
              body: {
                  "cond_data": temp_data
              }
          })
      }
    ), 
   
  }),
  overrideExisting: true,
});

// Export hooks for the new endpoints
export const { useGetDeviceQuery, useUpdateDeviceMutation, useUpdateLightDeviceMutation, useUpdateTempDeviceMutation } = divicesAPI;