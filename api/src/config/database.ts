import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/entities/users.entity';
import { Device } from 'src/entities/devices.entity';
import { Schedule } from 'src/entities/schedules.entity';
import { Sensor } from 'src/entities/sensors.entity';
import { Notification } from 'src/entities/home.entity';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
        type: 'postgres',

        host: configService.get('DB_HOST'),

        port: configService.get('DB_PORT'),

        username: configService.get('DB_USERNAME'),

        password: configService.get('DB_PASSWORD'),

        database: configService.get('DB_NAME'),

        entities: [
          User, 
          Device,
          Schedule,
          Sensor,
          Notification,
        ],

        synchronize: true,
    };
  }
}
export const config: TypeOrmModuleAsyncOptions = {

  imports: [ConfigModule],

  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.
   getOrmConfig(configService),
   inject: [ConfigService]
}