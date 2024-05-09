import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import{User} from 'src/entities/home.entity';
import{Notification} from 'src/entities/home.entity';
import{Schedule} from 'src/entities/schedules.entity';
import{Sensor} from 'src/entities/sensors.entity';
import { HomeController } from 'src/controllers/home/home.controller';
import { HomeService } from 'src/services/home/home.service';
import { SchedulesService } from 'src/services/schedules/schedules.service';
import { UsersModule } from '../users/users.module';


@Module({
    imports: [TypeOrmModule.forFeature([Notification, Schedule, Sensor]), UsersModule],
    controllers: [HomeController],
    providers: [HomeService, SchedulesService], 
  })
  export class HomeModule {}