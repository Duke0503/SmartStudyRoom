import{Controller, Get, Post, Param} from '@nestjs/common';
import { HomeService } from 'src/services/home/home.service';
import { Schedule } from 'src/entities/schedules.entity';
import { SchedulesService } from 'src/services/schedules/schedules.service';

@Controller('home')
export class HomeController{
    constructor(
        private readonly homeService: HomeService,
        private readonly schedulesService: SchedulesService
    ){}
    // @Get()
    // getHome(){
    //     return this.homeService
    // }



    // @Get('schedules')
    // getchedules() {
    //     return this.homeService;
    // }

    // @Get('devices')
    // getDevice() {
    //     return this.homeService
    // }

    // @Get('users')
    // getUserProfile() {
    //     return this.homeService
    // }

    @Get('notification')
    getNotification() {
        return this.homeService.getAllNotifications();
    }

    @Get('schedules/getallschedule')
    getAllSchedules() {
        return this.schedulesService.getAllSchedules();
    }

    @Get('schedules/getschedule/:user_id')
    getScheduleById(@Param('user_id') user_id: number): Promise<Schedule[]> {
        return this.schedulesService.getSchedulesByUserId(user_id);
    }

}