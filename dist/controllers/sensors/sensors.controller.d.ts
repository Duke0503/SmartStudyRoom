import { SensorsService } from 'src/services/sensors/sensors.service';
import { CreateSensorDto } from 'src/common/dto/create-sensor.dto';
import { UpdateSensorDto } from 'src/common/dto/update-sensor.dto';
import { Sensor } from 'src/entities/sensors.entity';
export declare class SensorsController {
    private readonly sensorsService;
    constructor(sensorsService: SensorsService);
    getSensorByUserId(user_id: number): Promise<Sensor[]>;
    createNewSensor(createSensorDto: CreateSensorDto, user_id: number): Promise<String>;
    updateDevice(updateSensorDto: UpdateSensorDto, sensor_id: number): Promise<String>;
    deleteSensor(sensor_id: number): Promise<String>;
}
