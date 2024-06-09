import { Module } from '@nestjs/common';
import { NotificationsService } from 'src/services/notifications/notifications.service';
import { NotificationsController } from 'src/controllers/notification/notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Notification } from 'src/entities/notifications.entity';
import { ExpoPushToken } from 'src/entities/ExpoPushToken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Notification, ExpoPushToken])],
  providers: [NotificationsService],
  controllers: [NotificationsController],
  exports: [NotificationsService],
})
export class NotificationsModule {}
