import { Controller, Post, Body, HttpException, HttpStatus, Delete, Param, Get } from '@nestjs/common';
import { CreateNotificationDto } from 'src/common/dto/create-notification.dto';
import { NotificationsService } from 'src/services/notifications/notifications.service';
import { ListScheduleNotificationsDto } from 'src/common/dto/list-schedule-notifications.dto';
import { createScheduledNotifications } from 'src/common/utils/createScheduledNotifications';
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('createExpoPushToken')
  async createExpoPushToken(@Body('token') token: string, @Body('userID') userID: number) {
    try {
      
      const expoPushToken = await this.notificationsService.updateExpoPushToken(token, userID);
      console.log(expoPushToken);
      return { success: true, expoPushToken};
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('create')
  async createScheduledNotification(@Body() createNotificationDto: CreateNotificationDto) {
    try {
      
      const notification = await this.notificationsService.createNotification(createNotificationDto);
      return { success: true, notification};
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('createlist')
  async createListScheduledNotification(@Body() listScheduleNotificationsDto: ListScheduleNotificationsDto) {
    try {
      const listNotification = createScheduledNotifications(listScheduleNotificationsDto);
      for (let notification of listNotification) {
        this.notificationsService.createNotification(notification);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete/:id')
  async deleteScheduledNotification(@Param('id') id: number) {
    return await this.notificationsService.deleteNotification(id);
  }

  @Get(':id')
  async getNotification (@Param('id') id: number) {
    return this.notificationsService.fetchNotifications(id);
  }
}
