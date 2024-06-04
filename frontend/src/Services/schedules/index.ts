import { API } from "../base";

const schedulesAPI = API.injectEndpoints({
    endpoints: (build) => ({
        getSchedule: build.query(
            {
                query: (user_ID) => `schedules/getschedule/${user_ID}`,
            }
        ),
        createSchedule: build.mutation(
            {
                query: ({title, status, start_time, finish_time, break_time, user_ID}) => ({
                    url: `schedules/createschedule/${user_ID}`,
                    method: "POST",
                    body: {
                        "title": title,
                        "status": status,
                        "start_time": start_time,
                        "finish_time": finish_time,
                        "break_time": break_time,
                        "user_ID": user_ID
                    }
                })
            }
        ),
        deleteSchedule: build.mutation(
            {
                query: ({schedule_ID}) => ({
                    url: `schedules/deleteschedule/${schedule_ID}`,
                    method: "DELETE",
                    body: {
                        "schedule_ID": schedule_ID
                    }
                })
            }
        )
    }),
    overrideExisting: true,
});


export const { useGetScheduleQuery, useLazyGetScheduleQuery, useCreateScheduleMutation, useDeleteScheduleMutation } = schedulesAPI;