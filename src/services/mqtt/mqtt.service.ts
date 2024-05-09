import { Injectable, OnModuleInit } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { MqttClient, connect } from "mqtt";
import { debug, error, info } from "ps-logger";

@Injectable()
export class MqttService implements OnModuleInit {
  private mqttClient: MqttClient;

  onModuleInit() {
    const host = "test.mosquitto.org";
    const port = "1883";
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

    const connectUrl = `mqtt://${host}:${port}`;
    const topic_sensor = "DADN/iot/sensor";

    this.mqttClient = connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
    //   username: "username",
    //   password: "password",
      reconnectPeriod: 1000,
    });

    this.mqttClient.on("connect", function () {
      info("Connected to CloudMQTT");
    });

    this.mqttClient.on("error", function () {
      error("Error in connecting to CloudMQTT");
    });

    this.mqttClient.subscribe(topic_sensor);

    this.mqttClient.on('message', function (topic, message) {
      console.log(`Receiving from: ${topic} with message: ${message}`);

      /////// luu sensor vao database
    });
  }

  publish(topic: string, payload: string): string {
    console.log(`Publishing to: ${topic} with payload: ${payload}`);
    this.mqttClient.publish(topic, payload);
    return `Publishing to ${topic}`;
  }
}