import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from 'src/common/dto/create-device.dto';
import { UpdateDeviceDto } from 'src/common/dto/update-device.dto';
import { Repository } from 'typeorm';
import { Device } from 'src/entities/devices.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly devicesRepository: Repository<Device>,
    private readonly userService: UsersService
  ){}
  async getDeviceByUserId(user_ID: number, type: string): Promise<Device[]> {
    if (type == "All") {
      const devices = this.devicesRepository.find({ where: { user: { ID: user_ID }} });
      if (devices) {
        return devices
      } else {
        throw new NotFoundException(`Can not get device`)
      }
    } else {
      const devices = this.devicesRepository.find({ where: { user: { ID: user_ID }, type: type} });
      if (devices) {
        return devices
      } else {
        throw new NotFoundException(`Can not get device`)
      }
    }
    
    
  }
  async createNewDevice(createDeviceDto: CreateDeviceDto, user_id: number): Promise<String> {
    try {
      const device = this.devicesRepository.create(createDeviceDto)
      const user = await this.userService.findUserbyId(user_id)
      device.user = user;
      await this.devicesRepository.save(device)
      return "Create Success"
    } catch {
      throw new NotFoundException(`Can not create new device`)
    }
  }

  async updateDevice(updateDeviceDto: UpdateDeviceDto, device_id: number): Promise<String> {
    try {
      const device = await this.devicesRepository.findOne({ where: {ID: device_id}});
      Object.assign(device, updateDeviceDto)
      await this.devicesRepository.save(device)
      return "Update Success"
    } catch {
      throw new NotFoundException(`Can not update device`)
    }
  }
 
  async deleteDevice(device_id: number): Promise<String> {
    try {
      const device = await this.devicesRepository.findOne({ where: {ID: device_id}});
      await this.devicesRepository.remove(device)
      return "Delete Success"
    } catch {
      throw new NotFoundException(`Can not delete device`)
    }
  }
}
