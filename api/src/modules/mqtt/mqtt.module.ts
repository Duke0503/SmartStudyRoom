import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SensorsModule } from '../sensors/sensors.module';
import { MqttController } from 'src/controllers/mqtt/mqtt.controller';
import { MqttService } from 'src/services/mqtt/mqtt.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SensorsModule
  ],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule {}