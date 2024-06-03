import { API } from "../base";

export interface ExpoPushToken {
  token: string;
  userID: number;
}

export interface Notification {
  title: string,
  content: string,
  userID: number,
  scheduleID: number,
  date: Date,
  isReady: boolean,
  isSent: boolean,
}
// Define new endpoints for fetching and updating user profile
const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    createExpoPushToken: build.mutation<void, {body: ExpoPushToken }> ({
      query: ({ body }) => ({
        url: 'notifications/createExpoPushToken',
        method: 'POST',
        body,
      }),
    }),

    createScheduledNotification: build.mutation<void, { body: Notification}> ({
      query: ({ body}) => ({
        url: 'notifications/create',
        method: 'POST',
        body
      })
    }),

    deleteScheduledNotification: build.mutation<void, {id: number}> ({
      query: ({ id }) => ({
        url: `notifications/delete/${id}`,
        method: 'DELETE',
      })
    }) 
  }),
  overrideExisting: true,
});

// Export hooks for the new endpoints
export const { 
  useCreateExpoPushTokenMutation, 
  useCreateScheduledNotificationMutation, 
  useDeleteScheduledNotificationMutation, 
} = userApi;