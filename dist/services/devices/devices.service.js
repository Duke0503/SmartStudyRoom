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
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const devices_entity_1 = require("../../entities/devices.entity");
const typeorm_2 = require("@nestjs/typeorm");
const users_service_1 = require("../users/users.service");
let DevicesService = class DevicesService {
    constructor(devicesRepository, userService) {
        this.devicesRepository = devicesRepository;
        this.userService = userService;
    }
    async getDeviceByUserId(user_ID) {
        const devices = this.devicesRepository.find({ where: { user: { ID: user_ID } } });
        if (devices) {
            return devices;
        }
        else {
            throw new common_1.NotFoundException(`Can not get device`);
        }
    }
    async createNewDevice(createDeviceDto, user_id) {
        try {
            const device = this.devicesRepository.create(createDeviceDto);
            const user = await this.userService.findUserbyId(user_id);
            device.user = user;
            await this.devicesRepository.save(device);
            return "Create Success";
        }
        catch {
            throw new common_1.NotFoundException(`Can not create new device`);
        }
    }
    async updateDevice(updateDeviceDto, device_id) {
        try {
            const device = await this.devicesRepository.findOne({ where: { ID: device_id } });
            Object.assign(device, updateDeviceDto);
            await this.devicesRepository.save(device);
            return "Update Success";
        }
        catch {
            throw new common_1.NotFoundException(`Can not update device`);
        }
    }
    async deleteDevice(device_id) {
        try {
            const device = await this.devicesRepository.findOne({ where: { ID: device_id } });
            await this.devicesRepository.remove(device);
            return "Delete Success";
        }
        catch {
            throw new common_1.NotFoundException(`Can not delete device`);
        }
    }
};
exports.DevicesService = DevicesService;
exports.DevicesService = DevicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(devices_entity_1.Device)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService])
], DevicesService);
//# sourceMappingURL=devices.service.js.map