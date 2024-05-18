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
exports.SensorsController = void 0;
const common_1 = require("@nestjs/common");
const sensors_service_1 = require("../../services/sensors/sensors.service");
const create_sensor_dto_1 = require("../../common/dto/create-sensor.dto");
const update_sensor_dto_1 = require("../../common/dto/update-sensor.dto");
let SensorsController = class SensorsController {
    constructor(sensorsService) {
        this.sensorsService = sensorsService;
    }
    getSensorByUserId(user_id) {
        return this.sensorsService.getSensorByUserId(user_id);
    }
    createNewSensor(createSensorDto, user_id) {
        return this.sensorsService.createNewSensor(createSensorDto, user_id);
    }
    updateDevice(updateSensorDto, sensor_id) {
        return this.sensorsService.updateSensor(updateSensorDto, sensor_id);
    }
    deleteSensor(sensor_id) {
        return this.sensorsService.deleteSensor(sensor_id);
    }
};
exports.SensorsController = SensorsController;
__decorate([
    (0, common_1.Get)('getsensorbyuserid/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SensorsController.prototype, "getSensorByUserId", null);
__decorate([
    (0, common_1.Post)('createnewsensor/:user_id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sensor_dto_1.CreateSensorDto, Number]),
    __metadata("design:returntype", Promise)
], SensorsController.prototype, "createNewSensor", null);
__decorate([
    (0, common_1.Patch)('updatesensor/:sensor_id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('sensor_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_sensor_dto_1.UpdateSensorDto, Number]),
    __metadata("design:returntype", Promise)
], SensorsController.prototype, "updateDevice", null);
__decorate([
    (0, common_1.Delete)('deletesensor/:sensor_id'),
    __param(0, (0, common_1.Param)('sensor_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SensorsController.prototype, "deleteSensor", null);
exports.SensorsController = SensorsController = __decorate([
    (0, common_1.Controller)('sensors'),
    __metadata("design:paramtypes", [sensors_service_1.SensorsService])
], SensorsController);
//# sourceMappingURL=sensors.controller.js.map