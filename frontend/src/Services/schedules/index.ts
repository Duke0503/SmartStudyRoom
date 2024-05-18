import { API } from "../base";

const schedulesAPI = API.injectEndpoints({
    endpoints: (build) => ({
        getAllSchedule: build.query(
            {
                query: () => 'schedules/getallschedule',
            }
        )
    }),
    overrideExisting: true,
});


export const { useGetAllScheduleQuery,useLazyGetAllScheduleQuery } = schedulesAPI;