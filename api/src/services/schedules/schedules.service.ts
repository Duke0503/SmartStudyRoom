import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedules.entity';
import { CreateScheduleDto } from 'src/common/dto/create-schedule.dto';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UpdateScheduleDto } from 'src/common/dto/update-schedule.dto';
import { ResponseSuccess } from 'src/common/dto/response.dto';
import { IResponse } from 'src/common/interfaces/response.interface';

@Injectable()
export class SchedulesService {
    constructor(
        @InjectRepository(Schedule)
        private readonly schedulesRepository: Repository<Schedule>,
        private readonly usersService: UsersService
    ) { }

    async getAllSchedules(): Promise<Schedule[]> {
        const schedules = await this.schedulesRepository.find();
        if (!schedules) {
            throw new NotFoundException();
        }
        return schedules;
    }

    async getSchedulesByUserId(userId: number): Promise<Schedule[]> {
        const schedules = await this.schedulesRepository.find({ where: { user: { ID: userId } } });
        if (!schedules) {
            throw new NotFoundException();
        }
        return schedules;
    }

    async createSchedule(createScheduleDto: CreateScheduleDto, user_id: number): Promise<IResponse> {
        try {
            const schedule = this.schedulesRepository.create(createScheduleDto);
            const user = await this.usersService.findUserbyId(user_id);
            schedule.user = user;
            await this.schedulesRepository.save(schedule);
            return new ResponseSuccess("SCHEDULE.SCHEDULE_CREATE_SUCCESSFULLY", schedule.ID);
        }
        catch (error) {
            throw new NotFoundException('Cannot create schedule')
        }
    }

    async updateSchedule(updateScheduleDto: UpdateScheduleDto, schedule_id: number): Promise<String> {
        try {
            const schedule = await this.schedulesRepository.findOne({ where: { ID: schedule_id } });
            Object.assign(schedule, updateScheduleDto);
            await this.schedulesRepository.save(schedule);
            return "Update schedule successfully"
        }
        catch (error) {
            throw new NotFoundException('Cannot update schedule')
        }
    }

    async deleteSchedule(schedule_id: number): Promise<String> {
        try {
            const schedule = await this.schedulesRepository.findOne({ where: { ID: schedule_id } });
            await this.schedulesRepository.remove(schedule);
            return "Delete schedule successfully"
        }
        catch (error) {
            throw new NotFoundException('Cannot delete schedule')
        }
    }
}
