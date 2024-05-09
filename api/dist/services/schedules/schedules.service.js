"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const schedules_entity_1 = require("../../entities/schedules.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
let SchedulesService = class SchedulesService {
    constructor(schedulesRepository, usersService) {
        this.schedulesRepository = schedulesRepository;
        this.usersService = usersService;
    }
    async getAllSchedules() {
        const schedules = await this.schedulesRepository.find();
        if (!schedules) {
            throw new common_1.NotFoundException();
        }
        return schedules;
    }
    async getSchedulesByUserId(userId) {
        const schedules = await this.schedulesRepository.find({ where: { user: { ID: userId } } });
        if (!schedules) {
            throw new common_1.NotFoundException();
        }
        return schedules;
    }
    async createSchedule(createScheduleDto, user_id) {
        try {
            const schedule = this.schedulesRepository.create(createScheduleDto);
            const user = await this.usersService.findUserbyId(user_id);
            schedule.user = user;
            await this.schedulesRepository.save(schedule);
            return "Create schedule successfully";
        }
        catch (error) {
            throw new common_1.NotFoundException('Cannot create schedule');
        }
    }
    async updateSchedule(updateScheduleDto, schedule_id) {
        try {
            const schedule = await this.schedulesRepository.findOne({ where: { ID: schedule_id } });
            Object.assign(schedule, updateScheduleDto);
            await this.schedulesRepository.save(schedule);
            return "Update schedule successfully";
        }
        catch (error) {
            throw new common_1.NotFoundException('Cannot update schedule');
        }
    }
    async deleteSchedule(schedule_id) {
        try {
            const schedule = await this.schedulesRepository.findOne({ where: { ID: schedule_id } });
            await this.schedulesRepository.remove(schedule);
            return "Delete schedule successfully";
        }
        catch (error) {
            throw new common_1.NotFoundException('Cannot delete schedule');
        }
    }
};
exports.SchedulesService = SchedulesService;
exports.SchedulesService = SchedulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(schedules_entity_1.Schedule)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], SchedulesService);
//# sourceMappingURL=schedules.service.js.map