"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttService = void 0;
const common_1 = require("@nestjs/common");
const mqtt_1 = require("mqtt");
const ps_logger_1 = require("ps-logger");
let MqttService = class MqttService {
    onModuleInit() {
        const host = "test.mosquitto.org";
        const port = "1883";
        const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
        const connectUrl = `mqtt://${host}:${port}`;
        const topic_sensor = "DADN/iot/sensor";
        this.mqttClient = (0, mqtt_1.connect)(connectUrl, {
            clientId,
            clean: true,
            connectTimeout: 4000,
            reconnectPeriod: 1000,
        });
        this.mqttClient.on("connect", function () {
            (0, ps_logger_1.info)("Connected to CloudMQTT");
        });
        this.mqttClient.on("error", function () {
            (0, ps_logger_1.error)("Error in connecting to CloudMQTT");
        });
        this.mqttClient.subscribe(topic_sensor);
        this.mqttClient.on('message', function (topic, message) {
            console.log(`Receiving from: ${topic} with message: ${message}`);
        });
    }
    publish(topic, payload) {
        console.log(`Publishing to: ${topic} with payload: ${payload}`);
        this.mqttClient.publish(topic, payload);
        return `Publishing to ${topic}`;
    }
};
exports.MqttService = MqttService;
exports.MqttService = MqttService = __decorate([
    (0, common_1.Injectable)()
], MqttService);
//# sourceMappingURL=mqtt.service.js.map