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
                query: ({title, status, start_time, finish_time, session_time, break_time, sensor_ID, user_ID}) => ({
                    url: `schedules/createschedule/${user_ID}`,
                    method: "POST",
                    body: {
                        "title": title,
                        "status": status,
                        "start_time": start_time,
                        "finish_time": finish_time,
                        "session_time": session_time,
                        "break_time": break_time,
                        "sensor_ID": sensor_ID,
                        "user_ID": user_ID
                    }
                })
            }
        ),
        updateSchedule: build.mutation(
            {
                query: ({schedule_ID, title, status, start_time, finish_time, session_time, break_time, sensor_ID, user_ID}) => ({
                    url: `schedules/updateschedule/${schedule_ID}`,
                    method: "PATCH",
                    body: {
                        "title": title,
                        "status": status,
                        "start_time": start_time,
                        "finish_time": finish_time,
                        "session_time": session_time,
                        "break_time": break_time,
                        "sensor_ID": sensor_ID,
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


export const { useGetScheduleQuery, useLazyGetScheduleQuery, useCreateScheduleMutation, useUpdateScheduleMutation, useDeleteScheduleMutation } = schedulesAPI;