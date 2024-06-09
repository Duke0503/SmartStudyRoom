import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SensorsModule } from '../sensors/sensors.module';
import { MqttController } from 'src/controllers/mqtt/mqtt.controller';
import { MqttService } from 'src/services/mqtt/mqtt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sensors, SensorSchema } from 'src/models/sensors.models';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SensorsModule,
    MongooseModule.forFeature([{ name: Sensors.name, schema: SensorSchema }]),
  ],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule {}