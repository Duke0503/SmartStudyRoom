import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MqttController } from 'src/controllers/mqtt/mqtt.controller';
import { MqttService } from 'src/services/mqtt/mqtt.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule {}