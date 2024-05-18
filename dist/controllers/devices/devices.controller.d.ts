import { DevicesService } from 'src/services/devices/devices.service';
import { CreateDeviceDto } from 'src/common/dto/create-device.dto';
import { UpdateDeviceDto } from 'src/common/dto/update-device.dto';
import { Device } from 'src/entities/devices.entity';
export declare class DevicesController {
    private readonly devicesService;
    constructor(devicesService: DevicesService);
    getDeviceByUserId(user_id: number): Promise<Device[]>;
    createNewDevice(createDeviceDto: CreateDeviceDto, user_id: number): Promise<String>;
    updateDevice(updateDeviceDto: UpdateDeviceDto, device_id: number): Promise<String>;
    deleteDevice(device_id: number): Promise<String>;
}
