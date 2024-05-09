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
exports.SensorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const sensors_entity_1 = require("../../entities/sensors.entity");
const typeorm_2 = require("@nestjs/typeorm");
const users_service_1 = require("../users/users.service");
let SensorsService = class SensorsService {
    constructor(sensorsRepository, userService) {
        this.sensorsRepository = sensorsRepository;
        this.userService = userService;
    }
    async getSensorByUserId(user_ID) {
        const sensors = this.sensorsRepository.find({ where: { user: { ID: user_ID } } });
        if (sensors) {
            return sensors;
        }
        else {
            throw new common_1.NotFoundException(`Can not get sensor`);
        }
    }
    async createNewSensor(createSensorDto, user_id) {
        try {
            const sensor = this.sensorsRepository.create(createSensorDto);
            const user = await this.userService.findUserbyId(user_id);
            sensor.user = user;
            await this.sensorsRepository.save(sensor);
            return "Create Success";
        }
        catch {
            throw new common_1.NotFoundException(`Can not create new sensor`);
        }
    }
    async updateSensor(updateSensorDto, sensor_id) {
        try {
            const sensor = await this.sensorsRepository.findOne({ where: { ID: sensor_id } });
            Object.assign(sensor, updateSensorDto);
            await this.sensorsRepository.save(sensor);
            return "Update Success";
        }
        catch {
            throw new common_1.NotFoundException(`Can not update sensor`);
        }
    }
    async deleteSensor(sensor_id) {
        try {
            const sensor = await this.sensorsRepository.findOne({ where: { ID: sensor_id } });
            await this.sensorsRepository.remove(sensor);
            return "Delete Success";
        }
        catch {
            throw new common_1.NotFoundException(`Can not delete sensor`);
        }
    }
};
exports.SensorsService = SensorsService;
exports.SensorsService = SensorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(sensors_entity_1.Sensor)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService])
], SensorsService);
//# sourceMappingURL=sensors.service.js.map