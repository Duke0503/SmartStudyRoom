import { CreateSensorDto } from 'src/common/dto/create-sensor.dto';
import { UpdateSensorDto } from 'src/common/dto/update-sensor.dto';
import { Repository } from 'typeorm';
import { Sensor } from 'src/entities/sensors.entity';
import { UsersService } from '../users/users.service';
export declare class SensorsService {
    private readonly sensorsRepository;
    private readonly userService;
    constructor(sensorsRepository: Repository<Sensor>, userService: UsersService);
    getSensorByUserId(user_ID: number): Promise<Sensor[]>;
    createNewSensor(createSensorDto: CreateSensorDto, user_id: number): Promise<String>;
    updateSensor(updateSensorDto: UpdateSensorDto, sensor_id: number): Promise<String>;
    deleteSensor(sensor_id: number): Promise<String>;
}
