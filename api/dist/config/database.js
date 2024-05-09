"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const config_1 = require("@nestjs/config");
const users_entity_1 = require("../entities/users.entity");
const devices_entity_1 = require("../entities/devices.entity");
const schedules_entity_1 = require("../entities/schedules.entity");
const sensors_entity_1 = require("../entities/sensors.entity");
const notifications_entity_1 = require("../entities/notifications.entity");
class TypeOrmConfig {
    static getOrmConfig(configService) {
        return {
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            entities: [
                users_entity_1.User,
                devices_entity_1.Device,
                schedules_entity_1.Schedule,
                sensors_entity_1.Sensor,
                notifications_entity_1.Notification,
            ],
            synchronize: true,
        };
    }
}
exports.default = TypeOrmConfig;
exports.config = {
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => TypeOrmConfig.
        getOrmConfig(configService),
    inject: [config_1.ConfigService]
};
//# sourceMappingURL=database.js.map