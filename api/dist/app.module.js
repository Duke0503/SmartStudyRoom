"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("./config/database");
const users_module_1 = require("./modules/users/users.module");
const sensors_module_1 = require("./modules/sensors/sensors.module");
const auth_module_1 = require("./modules/auth/auth.module");
const schedules_module_1 = require("./modules/schedules/schedules.module");
const home_module_1 = require("./modules/home/home.module");
const devices_module_1 = require("./modules/devices/devices.module");
const mqtt_module_1 = require("./modules/mqtt/mqtt.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync(database_1.config),
            users_module_1.UsersModule,
            sensors_module_1.SensorsModule,
            devices_module_1.DevicesModule,
            auth_module_1.AuthModule,
            schedules_module_1.SchedulesModule,
            home_module_1.HomeModule,
            mqtt_module_1.MqttModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map