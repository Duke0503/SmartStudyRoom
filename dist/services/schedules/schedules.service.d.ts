import { Schedule } from 'src/entities/schedules.entity';
import { CreateScheduleDto } from 'src/common/dto/create-schedule.dto';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UpdateScheduleDto } from 'src/common/dto/update-schedule.dto';
export declare class SchedulesService {
    private readonly schedulesRepository;
    private readonly usersService;
    constructor(schedulesRepository: Repository<Schedule>, usersService: UsersService);
    getAllSchedules(): Promise<Schedule[]>;
    getSchedulesByUserId(userId: number): Promise<Schedule[]>;
    createSchedule(createScheduleDto: CreateScheduleDto, user_id: number): Promise<String>;
    updateSchedule(updateScheduleDto: UpdateScheduleDto, schedule_id: number): Promise<String>;
    deleteSchedule(schedule_id: number): Promise<String>;
}
