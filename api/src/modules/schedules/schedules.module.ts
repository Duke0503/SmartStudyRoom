import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulesController } from 'src/controllers/schedules/schedules.controller';
import { Schedule } from 'src/entities/schedules.entity';
import { SchedulesService } from 'src/services/schedules/schedules.service';
import { UsersModule } from '../users/users.module';
import { Notification } from 'src/entities/notifications.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Schedule, Notification]), UsersModule],
    controllers: [SchedulesController],
    providers: [SchedulesService],
})
export class SchedulesModule { }
