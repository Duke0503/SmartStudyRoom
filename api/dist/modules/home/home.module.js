"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const home_entity_1 = require("../../entities/home.entity");
const schedules_entity_1 = require("../../entities/schedules.entity");
const sensors_entity_1 = require("../../entities/sensors.entity");
const home_controller_1 = require("../../controllers/home/home.controller");
const home_service_1 = require("src/services/home/home.service");
const schedules_service_1 = require("../../services/schedules/schedules.service");
const users_module_1 = require("../users/users.module");
let HomeModule = class HomeModule {
};
exports.HomeModule = HomeModule;
exports.HomeModule = HomeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([home_entity_1.Notification, schedules_entity_1.Schedule, sensors_entity_1.Sensor]), users_module_1.UsersModule],
        controllers: [home_controller_1.HomeController],
        providers: [home_service_1.HomeService, schedules_service_1.SchedulesService],
    })
], HomeModule);
//# sourceMappingURL=home.module.js.map