import { MqttService } from 'src/services/mqtt/mqtt.service';
export declare class MqttController {
    private readonly mqttService;
    constructor(mqttService: MqttService);
    publish(): void;
}
