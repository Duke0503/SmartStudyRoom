import { CreateNotificationDto } from "../dto/create-notification.dto";
import { ListScheduleNotificationsDto } from "../dto/list-schedule-notifications.dto";
export const createScheduledNotifications = ( listScheduleNotificationsDto: ListScheduleNotificationsDto ): CreateNotificationDto[] => {
  const notificationList : CreateNotificationDto[] = [];

  const beforeSession = new CreateNotificationDto();
  beforeSession.title = "Phiên học";
  beforeSession.content = `Phiên học ${listScheduleNotificationsDto.title} sắp bắt đầu`;
  beforeSession.userID = listScheduleNotificationsDto.userID;
  beforeSession.scheduleID = listScheduleNotificationsDto.scheduleID;
  beforeSession.date = new Date(new Date(listScheduleNotificationsDto.startTime).getTime() - 5 * 60 * 1000);
  beforeSession.isReady = false;
  beforeSession.isSent = false;

  notificationList.push(beforeSession);

  const startSession = new CreateNotificationDto();
  startSession.title = "Phiên học";
  startSession.content = `Phiên học ${listScheduleNotificationsDto.title} bắt đầu`;
  startSession.userID = listScheduleNotificationsDto.userID;
  startSession.scheduleID = listScheduleNotificationsDto.scheduleID;
  startSession.date = listScheduleNotificationsDto.startTime;
  startSession.isReady = false;
  startSession.isSent = false;

  notificationList.push(startSession);

  const finishSession = new CreateNotificationDto();
  finishSession.title = "Phiên học";
  finishSession.content = `Phiên học ${listScheduleNotificationsDto.title} kết thúc`;
  finishSession.userID = listScheduleNotificationsDto.userID;
  finishSession.scheduleID = listScheduleNotificationsDto.scheduleID;
  finishSession.date = listScheduleNotificationsDto.finishTime;
  finishSession.isReady = false;
  finishSession.isSent = false;

  notificationList.push(finishSession);

  let time = listScheduleNotificationsDto.startTime;
  if (listScheduleNotificationsDto.sessionTime || listScheduleNotificationsDto.sessionTime !== 0) {

    time = new Date(new Date(time).getTime() + listScheduleNotificationsDto.sessionTime * 60 * 1000);

    while(time < new Date(listScheduleNotificationsDto.finishTime)) {
      const startBreakSession = new CreateNotificationDto();
      startBreakSession.title = "Phiên học";
      startBreakSession.content = `Phiên học ${listScheduleNotificationsDto.title} bắt đầu thời gian giải lao`;
      startBreakSession.userID = listScheduleNotificationsDto.userID;
      startBreakSession.scheduleID = listScheduleNotificationsDto.scheduleID;
      startBreakSession.date = time;
      startBreakSession.isReady = false;
      startBreakSession.isSent = false;

      notificationList.push(startBreakSession);

      if (listScheduleNotificationsDto.breakTime || listScheduleNotificationsDto.breakTime !== 0) {
        time = new Date(new Date(time).getTime() + listScheduleNotificationsDto.breakTime * 60 * 1000);
        if (time < new Date(listScheduleNotificationsDto.finishTime)) {
          const finishBreakSession = new CreateNotificationDto();
          finishBreakSession.title = "Phiên học";
          finishBreakSession.content = `Phiên học ${listScheduleNotificationsDto.title} kết thúc thời gian giải lao`;
          finishBreakSession.userID = listScheduleNotificationsDto.userID;
          finishBreakSession.scheduleID = listScheduleNotificationsDto.scheduleID;
          finishBreakSession.date = time;
          finishBreakSession.isReady = false;
          finishBreakSession.isSent = false;
    
          notificationList.push(finishBreakSession);
        } 
      } 
      time = new Date(new Date(time).getTime() + listScheduleNotificationsDto.sessionTime * 60 * 1000);
    }
  }

  return notificationList;
}