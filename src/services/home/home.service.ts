import { Injectable, NotFoundException } from '@nestjs/common';
import { Notification } from 'src/entities/home.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { SchedulesService } from 'src/services/schedules/schedules.service';
import { DevicesService } from 'src/services/devices/devices.service';
import { SensorsService } from 'src/services/sensors/sensors.service';

@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
        private readonly schedulesService: SchedulesService,
        private readonly sensorsService: SensorsService,
        private readonly devicesService: DevicesService,
        private readonly usersService: UsersService
    ) {}

    async getAllNotifications(): Promise<Notification[]> {
        const notifications = this.notificationRepository.find();
        if (!notifications) {
            throw new NotFoundException();
        }
        return notifications;
    }

    


}