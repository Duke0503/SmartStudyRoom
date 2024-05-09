import { OnModuleInit } from "@nestjs/common";
export declare class MqttService implements OnModuleInit {
    private mqttClient;
    onModuleInit(): void;
    publish(topic: string, payload: string): string;
}
