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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const common_1 = require("@nestjs/common");
const home_service_1 = require("src/services/home/home.service");
const schedules_service_1 = require("../../services/schedules/schedules.service");
let HomeController = class HomeController {
    constructor(homeService, schedulesService) {
        this.homeService = homeService;
        this.schedulesService = schedulesService;
    }
    getNotification() {
        return this.homeService.getAllNotifications();
    }
    getAllSchedules() {
        return this.schedulesService.getAllSchedules();
    }
    getScheduleById(user_id) {
        return this.schedulesService.getSchedulesByUserId(user_id);
    }
};
exports.HomeController = HomeController;
__decorate([
    (0, common_1.Get)('notification'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "getNotification", null);
__decorate([
    (0, common_1.Get)('schedules/getallschedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "getAllSchedules", null);
__decorate([
    (0, common_1.Get)('schedules/getschedule/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getScheduleById", null);
exports.HomeController = HomeController = __decorate([
    (0, common_1.Controller)('home'),
    __metadata("design:paramtypes", [typeof (_a = typeof home_service_1.HomeService !== "undefined" && home_service_1.HomeService) === "function" ? _a : Object, schedules_service_1.SchedulesService])
], HomeController);
//# sourceMappingURL=home.controller.js.map