"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesModule = void 0;
const common_1 = require("@nestjs/common");
const devices_service_1 = require("../../services/devices/devices.service");
const devices_controller_1 = require("../../controllers/devices/devices.controller");
const typeorm_1 = require("@nestjs/typeorm");
const devices_entity_1 = require("../../entities/devices.entity");
const users_module_1 = require("../users/users.module");
let DevicesModule = class DevicesModule {
};
exports.DevicesModule = DevicesModule;
exports.DevicesModule = DevicesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([devices_entity_1.Device]), users_module_1.UsersModule],
        controllers: [devices_controller_1.DevicesController],
        providers: [devices_service_1.DevicesService],
    })
], DevicesModule);
//# sourceMappingURL=devices.module.js.map