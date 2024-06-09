import { API } from "../base";

export interface ExpoPushToken {
  token: string;
  userID: number;
}

export interface Notification {
  title: string,
  userID: number,
  scheduleID: number,
  startTime: Date,
  sessionTime: number,
  breakTime: number,
  finishTime: Date,
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
        url: 'notifications/createlist',
        method: 'POST',
        body
      })
    }),
    
    deleteScheduledNotification: build.mutation<void, {id: number}> ({
      query: ({ id }) => ({
        url: `notifications/delete/${id}`,
        method: 'DELETE',
      })
    }), 

    getNotifications: build.query<Notification[], {id: number}> ({
      query: (id) => `notifications/${id}`,
    }),
  }),
  overrideExisting: true,
});

// Export hooks for the new endpoints
export const { 
  useCreateExpoPushTokenMutation, 
  useCreateScheduledNotificationMutation, 
  useDeleteScheduledNotificationMutation, 
  useGetNotificationsQuery,
} = userApi;