import { Controller, Post, Body, HttpException, HttpStatus, Delete, Param } from '@nestjs/common';
import { CreateNotificationDto } from 'src/common/dto/create-notification.dto';
import { NotificationsService } from 'src/services/notifications/notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('createExpoPushToken')
  async createExpoPushToken(@Body('token') token: string, @Body('userID') userID: number) {
    try {
      const expoPushToken = await this.notificationsService.updateExpoPushToken(token, userID);
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

  @Delete('delete/:id')
  async deleteScheduledNotification(@Param('id') id: number) {
    return await this.notificationsService.deleteNotification(id);
  }
}
