import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { NotificationsService } from 'src/services/notifications/notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // @Post('send')
  // async sendNotification(@Body('token') token: string, @Body('message') message: string) {
  //   try {
  //     const tickets = await this.notificationsService.sendPushNotification(token, message);
  //     return { success: true, tickets };
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }
}
