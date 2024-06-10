import { API } from "../base";

const sensorsAPI = API.injectEndpoints({
  endpoints: (build) => ({
    getSensor: build.query({
      query: (arg) => {
        const {ip} = arg;
        return `sensors/getsensorbyIP/${ip}`;
      },
      onQueryStarted: async (apiRequest, { dispatch, getState }) => {
        console.log('getSensor request started:', apiRequest);
      },
    }),
    updateLightSensor: build.mutation(
      {
          query: ({sensor_id, light_data}) => ({
              url: `sensors/updatesensor/${sensor_id}`,
              method: "PATCH",
              body: {
                  "light_data": light_data
              }
          })
      }
    ), 
    updateTempSensor: build.mutation(
      {
          query: ({sensor_id, temp_data}) => ({
              url: `sensors/updatesensor/${sensor_id}`,
              method: "PATCH",
              body: {
                  "temp_data": temp_data
              }
          })
      }
    )
  }),
  overrideExisting: true,
});

// Export hooks for the new endpoints
export const { useGetSensorQuery, useLazyGetSensorQuery, useUpdateLightSensorMutation, useUpdateTempSensorMutation} = sensorsAPI;