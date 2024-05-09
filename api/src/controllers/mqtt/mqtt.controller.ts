import { Controller, Get, Post, Body } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MqttService } from 'src/services/mqtt/mqtt.service';
import { CreateMqttRequest } from 'src/common/dto/create-mqtt-request.dto';

@Controller()
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Cron('*/3 * * * * *')
  publish() {
    this.mqttService.publish("DADN/iot/lamp", "53");
  }
}