import { Injectable, OnModuleInit, Inject } from "@nestjs/common";
import { MqttClient, connect } from "mqtt";
import { debug, error, info } from "ps-logger";
import { SensorsService } from "../sensors/sensors.service";
import { CreateSensorDto } from "src/common/dto/create-sensor.dto";
import { UpdateSensorDto } from "src/common/dto/update-sensor.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Sensors } from "src/models/sensors.models";
import { CreateSensorModelDto } from "src/common/dto/create-sensor-model.dto";
import { now } from "moment";

@Injectable()
export class MqttService implements OnModuleInit {
  private mqttClient: MqttClient;
  private sensorTimeouts: Map<string, NodeJS.Timeout> = new Map();
  constructor(
    private sensorService: SensorsService,
    @InjectModel(Sensors.name)
    private sensorModel: Model<Sensors>,
  ) {}

  onModuleInit() {
    const host = "test.mosquitto.org";
    const port = "1883";
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

    const connectUrl = `mqtt://${host}:${port}`;
    const topic_sensor = "DADN/iot/sensor/+";

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
  
    this.mqttClient.on('message', async (topic, message) => {
      console.log(`Receiving from: ${topic} with message: ${message}`);

      // String to JSON
      const data = JSON.parse(message.toString());

      // Push Sensor Data to MongoDB
      const createSensorModelDto = new CreateSensorModelDto();
      createSensorModelDto.id_sensor = data.id_sensor;
      createSensorModelDto.sound_data = parseInt(data.sound_data);
      createSensorModelDto.light_data = parseInt(data.light_data);
      createSensorModelDto.temp_data = parseFloat(data.temp_data);
      createSensorModelDto.camera_data = data.camera_data;
      createSensorModelDto.time = new Date();

      const createdSensor = new this.sensorModel(createSensorModelDto);

      try {
        return await createdSensor.save();
      } catch (error) {
        throw new Error(`Failed to create sensor: ${error.message}`);
      }

      // Check if sensor exists in database
      try {
        if (this.sensorService.getSensorBySensorId(data.id_sensor)) {
          // Update sensor data
          const updateSensorDto = new UpdateSensorDto();
          updateSensorDto.ip_address = data.ip_address;
          updateSensorDto.is_active = true;
          updateSensorDto.light_data = data.light;
          updateSensorDto.temp_data = data.temp;
          updateSensorDto.sound_data = data.sound;
          updateSensorDto.camera_data = data.camera;

          await this.sensorService.updateSensor(updateSensorDto, data.id_sensor);
          console.log("Updated sensor:", data.id_sensor);
        } else {
          // Create new sensor
          const createSensorDto = new CreateSensorDto();
          createSensorDto.ip_address = data.ip_address;
          createSensorDto.is_active = true;
          createSensorDto.light_data = data.light;
          createSensorDto.temp_data = data.temp;
          createSensorDto.sound_data = data.sound;
          createSensorDto.camera_data = data.camera;

          await this.sensorService.createNewSensor(createSensorDto, data.id_sensor);
          console.log("Created new sensor:", data.id_sensor);
        }
        
        // Reset the timer for this sensor
        this.resetSensorTimeout(data.id_sensor);
      } catch (err) {
        error(`Error processing sensor data: ${err.message}`);
      }
    });
  }

  resetSensorTimeout(sensorId: string) {
    // Clear existing timeout if any
    if (this.sensorTimeouts.has(sensorId)) {
      clearTimeout(this.sensorTimeouts.get(sensorId));
    }

    // Set a new timeout
    const timeout = setTimeout(async () => {
      try {
        const updateSensorDto = new UpdateSensorDto();
        updateSensorDto.is_active = false;
        await this.sensorService.updateSensor(updateSensorDto, sensorId);
        console.log(`Sensor: ${sensorId} marked as inactive due to timeout`);
      } catch (err) {
        error(`Error marking sensor as inactive: ${err.message}`);
      }
    }, 2 * 60 * 1000); // 2 minutes

    // Store the timeout handle
    this.sensorTimeouts.set(sensorId, timeout);
  }

  publish(topic: string, payload: string): string {
    console.log(`Publishing to: ${topic} with payload: ${payload}`);
    this.mqttClient.publish(topic, payload);
    return `Publishing to ${topic}`;
  }
}