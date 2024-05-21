import { HomeService } from 'src/services/home/home.service';
import { Schedule } from 'src/entities/schedules.entity';
import { SchedulesService } from 'src/services/schedules/schedules.service';
export declare class HomeController {
    private readonly homeService;
    private readonly schedulesService;
    constructor(homeService: HomeService, schedulesService: SchedulesService);
    getNotification(): Promise<import("../../entities/home.entity").Notification[]>;
    getAllSchedules(): Promise<Schedule[]>;
    getScheduleById(user_id: number): Promise<Schedule[]>;
}
