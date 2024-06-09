export class ListScheduleNotificationsDto {
  title: string;
  
  isReady: boolean;

  isSent: boolean;

  startTime: Date;

  sessionTime: number;
  
  breakTime: number;

  finishTime: Date;

  userID: number;

  scheduleID: number;
}