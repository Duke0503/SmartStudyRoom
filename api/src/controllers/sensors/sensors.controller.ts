import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SensorsService } from 'src/services/sensors/sensors.service';
import { CreateSensorDto } from 'src/common/dto/create-sensor.dto';
import { UpdateSensorDto } from 'src/common/dto/update-sensor.dto';
import { Sensor } from 'src/entities/sensors.entity';

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Get('getsensorbysensorid/:sensor_id')
  getSensorBySensorId(@Param('sensor_id') sensor_id: string): Promise<Sensor> {
    return this.sensorsService.getSensorBySensorId(sensor_id);
  }
  @Get('getsensorbyIP/:ip')
  getSensorByIP(@Param('ip') ip: string): Promise<Sensor[]> {
    return this.sensorsService.getSensorByIP(ip);
  }
  @Post('createnewsensor/:sensor_id')
  createNewSensor(@Body() createSensorDto: CreateSensorDto, @Param('sensor_id') sensor_id: string): Promise<String> {
    return this.sensorsService.createNewSensor(createSensorDto, sensor_id);
  } 
  @Patch('updatesensor/:sensor_id')
  updateDevice(@Body() updateSensorDto: UpdateSensorDto, @Param('sensor_id') sensor_id: string): Promise<String> {
    return this.sensorsService.updateSensor(updateSensorDto, sensor_id);
  }

  @Delete('deletesensor/:sensor_id')
  deleteSensor(@Param('sensor_id') sensor_id: number): Promise<String> {
    return this.sensorsService.deleteSensor(sensor_id)
  }
}