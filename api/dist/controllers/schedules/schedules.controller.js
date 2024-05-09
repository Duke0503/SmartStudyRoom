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
exports.SchedulesController = void 0;
const common_1 = require("@nestjs/common");
const create_schedule_dto_1 = require("../../common/dto/create-schedule.dto");
const update_schedule_dto_1 = require("../../common/dto/update-schedule.dto");
const schedules_service_1 = require("../../services/schedules/schedules.service");
let SchedulesController = class SchedulesController {
    constructor(schedulesService) {
        this.schedulesService = schedulesService;
    }
    getAllSchedules() {
        return this.schedulesService.getAllSchedules();
    }
    getScheduleById(user_id) {
        return this.schedulesService.getSchedulesByUserId(user_id);
    }
    createSchedule(createScheduleDto, user_id) {
        return this.schedulesService.createSchedule(createScheduleDto, user_id);
    }
    updateSchedule(updateScheduleDto, schedule_id) {
        return this.schedulesService.updateSchedule(updateScheduleDto, schedule_id);
    }
    deleteSchedule(schedule_id) {
        return this.schedulesService.deleteSchedule(schedule_id);
    }
};
exports.SchedulesController = SchedulesController;
__decorate([
    (0, common_1.Get)('getallschedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SchedulesController.prototype, "getAllSchedules", null);
__decorate([
    (0, common_1.Get)('getschedule/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "getScheduleById", null);
__decorate([
    (0, common_1.Post)('createschedule/:user_id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_schedule_dto_1.CreateScheduleDto, Number]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "createSchedule", null);
__decorate([
    (0, common_1.Patch)('updateschedule/:schedule_id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('schedule_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_schedule_dto_1.UpdateScheduleDto, Number]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "updateSchedule", null);
__decorate([
    (0, common_1.Delete)('deleteschedule/:schedule_id'),
    __param(0, (0, common_1.Param)('schedule_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "deleteSchedule", null);
exports.SchedulesController = SchedulesController = __decorate([
    (0, common_1.Controller)('schedules'),
    __metadata("design:paramtypes", [schedules_service_1.SchedulesService])
], SchedulesController);
//# sourceMappingURL=schedules.controller.js.map