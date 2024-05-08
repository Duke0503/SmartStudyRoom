import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SensorsService } from 'src/services/sensors/sensors.service';
import { CreateSensorDto } from 'src/common/dto/create-sensor.dto';
import { UpdateSensorDto } from 'src/common/dto/update-sensor.dto';
import { Sensor } from 'src/entities/sensors.entity';
@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Get('getsensorbyuserid/:user_id')
  getSensorByUserId(@Param('user_id') user_id: number): Promise<Sensor[]> {
    return this.sensorsService.getSensorByUserId(user_id);
  }
  @Post('createnewsensor/:user_id')
  createNewSensor(@Body() createSensorDto: CreateSensorDto, @Param('user_id') user_id: number): Promise<String> {
    return this.sensorsService.createNewSensor(createSensorDto, user_id);
  } 
  @Patch('updatesensor/:sensor_id')
  updateDevice(@Body() updateSensorDto: UpdateSensorDto, @Param('sensor_id') sensor_id: number): Promise<String> {
    return this.sensorsService.updateSensor(updateSensorDto, sensor_id);
  }

  @Delete('deletesensor/:sensor_id')
  deleteSensor(@Param('sensor_id') sensor_id: number): Promise<String> {
    return this.sensorsService.deleteSensor(sensor_id)
  }
}
