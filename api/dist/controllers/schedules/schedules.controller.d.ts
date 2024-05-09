import { Schedule } from 'src/entities/schedules.entity';
import { CreateScheduleDto } from 'src/common/dto/create-schedule.dto';
import { UpdateScheduleDto } from 'src/common/dto/update-schedule.dto';
import { SchedulesService } from 'src/services/schedules/schedules.service';
export declare class SchedulesController {
    private readonly schedulesService;
    constructor(schedulesService: SchedulesService);
    getAllSchedules(): Promise<Schedule[]>;
    getScheduleById(user_id: number): Promise<Schedule[]>;
    createSchedule(createScheduleDto: CreateScheduleDto, user_id: number): Promise<String>;
    updateSchedule(updateScheduleDto: UpdateScheduleDto, schedule_id: number): Promise<String>;
    deleteSchedule(schedule_id: number): Promise<String>;
}
