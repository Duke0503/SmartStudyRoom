import { Injectable, NotFoundException } from '@nestjs/common';
import { Notification } from 'src/entities/notifications.entity';
import { Schedule } from 'src/entities/schedules.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
        // private readonly schedulesRepository: Repository<Schedule>,
    ) {}

    async getAllNotifications(): Promise<Notification[]> {
        const notifications = this.notificationRepository.find();
        if (!notifications) {
            throw new NotFoundException();
        }
        return notifications;
    }

    // async getAllSchedules(): Promise<Schedule[]> {
    //     const schedules = await this.schedulesRepository.find();
    //     if (!schedules) {
    //         throw new NotFoundException();
    //     }
    //     return schedules;
    // }

    // async getSchedulesByUserId(userId: number): Promise<Schedule[]> {
    //     const schedules = await this.schedulesRepository.find({ where: { user: { ID: userId } } });
    //     if (!schedules) {
    //         throw new NotFoundException();
    //     }
    //     return schedules;
    // }
    


}