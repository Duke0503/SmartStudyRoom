import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import{User} from 'src/entities/home.entity';
import { Notification } from 'src/entities/notifications.entity';
import{Schedule} from 'src/entities/schedules.entity';
import{Sensor} from 'src/entities/sensors.entity';
import { HomeController } from 'src/controllers/home/home.controller';
import { HomeService } from 'src/services/home/home.service';
import { UsersModule } from '../users/users.module';
import { User } from 'src/entities/users.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [TypeOrmModule.forFeature([Notification, Schedule, Sensor, User]), UsersModule, NotificationsModule],
    controllers: [HomeController],
    providers: [HomeService], 
  })
  export class HomeModule {}