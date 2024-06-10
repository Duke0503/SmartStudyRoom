import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SensorsModule } from '../sensors/sensors.module';
import { MqttController } from 'src/controllers/mqtt/mqtt.controller';
import { MqttService } from 'src/services/mqtt/mqtt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sensors, SensorSchema } from 'src/models/sensors.models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SensorsModule,
    MongooseModule.forFeature([{ name: Sensors.name, schema: SensorSchema }]),
    TypeOrmModule.forFeature([User]),
    NotificationsModule,
  ],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule {}