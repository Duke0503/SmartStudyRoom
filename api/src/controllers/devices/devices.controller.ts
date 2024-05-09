import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { DevicesService } from 'src/services/devices/devices.service';
import { CreateDeviceDto } from 'src/common/dto/create-device.dto';
import { UpdateDeviceDto } from 'src/common/dto/update-device.dto';
import { Device } from 'src/entities/devices.entity';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get('getdevice/:user_id')
  getDeviceByUserId(@Param('user_id') user_id: number): Promise<Device[]> {
    return this.devicesService.getDeviceByUserId(user_id);
  }

  @Post('createnewdevice/:user_id')
  createNewDevice(@Body() createDeviceDto: CreateDeviceDto, @Param('user_id') user_id: number): Promise<String> {
    return this.devicesService.createNewDevice(createDeviceDto, user_id);
  } 

  @Patch('updatedevice/:device_id')
  updateDevice(@Body() updateDeviceDto: UpdateDeviceDto, @Param('device_id') device_id: number): Promise<String> {
    return this.devicesService.updateDevice(updateDeviceDto, device_id);
  }

  @Delete('deletedevice/:device_id')
  deleteDevice(@Param('device_id') device_id: number): Promise<String> {
    return this.devicesService.deleteDevice(device_id)
  }
}
