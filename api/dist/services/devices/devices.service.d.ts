import { CreateDeviceDto } from 'src/common/dto/create-device.dto';
import { UpdateDeviceDto } from 'src/common/dto/update-device.dto';
import { Repository } from 'typeorm';
import { Device } from 'src/entities/devices.entity';
import { UsersService } from '../users/users.service';
export declare class DevicesService {
    private readonly devicesRepository;
    private readonly userService;
    constructor(devicesRepository: Repository<Device>, userService: UsersService);
    getDeviceByUserId(user_ID: number): Promise<Device[]>;
    createNewDevice(createDeviceDto: CreateDeviceDto, user_id: number): Promise<String>;
    updateDevice(updateDeviceDto: UpdateDeviceDto, device_id: number): Promise<String>;
    deleteDevice(device_id: number): Promise<String>;
}
