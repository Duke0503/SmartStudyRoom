export class CreateNotificationDto {
  title: string;
  
  content: string;

  isReady: boolean;

  isSent: boolean;

  date: Date;

  userID: number;

  scheduleID: number;
}