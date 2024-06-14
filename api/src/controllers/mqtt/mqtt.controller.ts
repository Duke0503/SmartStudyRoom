import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
// import { Cron } from '@nestjs/schedule';
import { MqttService } from 'src/services/mqtt/mqtt.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  // @Cron('*/30 * * * * *')
  @Patch('update/light')
  async publish(@Body() data: {light_data: number}) {
    console.log(data.light_data)
    this.mqttService.publish("DADN/iot/lamp/id1", `${data.light_data}`);
  }
}