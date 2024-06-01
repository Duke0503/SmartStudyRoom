import { Controller, Get, Post, Body } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MqttService } from 'src/services/mqtt/mqtt.service';

@Controller()
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Cron('*/30 * * * * *')
  publish() {
    this.mqttService.publish("DADN/iot/lamp/id1", "53");
  }
}