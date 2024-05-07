import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulesController } from 'src/controllers/schedules/schedules.controller';
import { Schedule } from 'src/entities/schedules.entity';
import { SchedulesService } from 'src/services/schedules/schedules.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Schedule]), UsersModule],
    controllers: [SchedulesController],
    providers: [SchedulesService],
})
export class SchedulesModule { }
