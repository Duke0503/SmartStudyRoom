import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Schedule } from 'src/entities/schedules.entity';
import { CreateScheduleDto } from 'src/helpers/dto/schedules/create-schedule.dto';
import { UpdateScheduleDto } from 'src/helpers/dto/schedules/update-schedule.dto';
import { SchedulesService } from 'src/services/schedules/schedules.service';

@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) { }

    @Get('getallschedule')
    getAllSchedules() {
        return this.schedulesService.getAllSchedules();
    }

    @Get('getschedule/:user_id')
    getScheduleById(@Param('user_id') user_id: number): Promise<Schedule[]> {
        return this.schedulesService.getSchedulesByUserId(user_id);
    }

    @Post('createschedule/:user_id')
    createSchedule(@Body() createScheduleDto: CreateScheduleDto, @Param('user_id') user_id: number): Promise<String> {
        return this.schedulesService.createSchedule(createScheduleDto, user_id);
    }

    @Patch('updateschedule/:schedule_id')
    updateSchedule(@Body() updateScheduleDto: UpdateScheduleDto, @Param('schedule_id') schedule_id: number): Promise<String> {
        return this.schedulesService.updateSchedule(updateScheduleDto, schedule_id)
    }

    @Delete('deleteschedule/:schedule_id')
    deleteSchedule(@Param('schedule_id') schedule_id: number): Promise<String> {
        return this.schedulesService.deleteSchedule(schedule_id)
    }

}
