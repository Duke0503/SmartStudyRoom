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
exports.DevicesController = void 0;
const common_1 = require("@nestjs/common");
const devices_service_1 = require("../../services/devices/devices.service");
const create_device_dto_1 = require("../../common/dto/create-device.dto");
const update_device_dto_1 = require("../../common/dto/update-device.dto");
let DevicesController = class DevicesController {
    constructor(devicesService) {
        this.devicesService = devicesService;
    }
    getDeviceByUserId(user_id) {
        return this.devicesService.getDeviceByUserId(user_id);
    }
    createNewDevice(createDeviceDto, user_id) {
        return this.devicesService.createNewDevice(createDeviceDto, user_id);
    }
    updateDevice(updateDeviceDto, device_id) {
        return this.devicesService.updateDevice(updateDeviceDto, device_id);
    }
    deleteDevice(device_id) {
        return this.devicesService.deleteDevice(device_id);
    }
};
exports.DevicesController = DevicesController;
__decorate([
    (0, common_1.Get)('getdevice/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "getDeviceByUserId", null);
__decorate([
    (0, common_1.Post)('createnewdevice/:user_id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_device_dto_1.CreateDeviceDto, Number]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "createNewDevice", null);
__decorate([
    (0, common_1.Patch)('updatedevice/:device_id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('device_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_device_dto_1.UpdateDeviceDto, Number]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "updateDevice", null);
__decorate([
    (0, common_1.Delete)('deletedevice/:device_id'),
    __param(0, (0, common_1.Param)('device_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "deleteDevice", null);
exports.DevicesController = DevicesController = __decorate([
    (0, common_1.Controller)('devices'),
    __metadata("design:paramtypes", [devices_service_1.DevicesService])
], DevicesController);
//# sourceMappingURL=devices.controller.js.map