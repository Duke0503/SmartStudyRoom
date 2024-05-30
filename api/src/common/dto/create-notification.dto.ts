import { User } from "src/entities/users.entity";

export class CreateNotificationDto {
  title: string;
  
  content: string;

  isReady: boolean;

  isSent: boolean;

  date: Date;

  userID: number;
}