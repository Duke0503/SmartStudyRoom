import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/database';
import { UsersModule } from './modules/users/users.module';
import { SensorsModule } from './modules/sensors/sensors.module';
import { AuthModule } from './modules/auth/auth.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { HomeModule } from './modules/home/home.module';
import { DevicesModule} from './modules/devices/devices.module'
import { MqttModule } from './modules/mqtt/mqtt.module';
import { NotificationsModule } from './modules/notifications/notifications.module';


@Module({
  imports: [    
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(config),
    UsersModule,
    SensorsModule,
    DevicesModule,
    AuthModule,
    SchedulesModule,
    HomeModule,
    MqttModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
