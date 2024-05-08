import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSensorDto } from 'src/common/dto/create-sensor.dto';
import { UpdateSensorDto } from 'src/common/dto/update-sensor.dto';
import { Repository } from 'typeorm';
import { Sensor } from 'src/entities/sensors.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorsRepository: Repository<Sensor>,
    private readonly userService: UsersService
  ){}

  async getSensorByUserId(user_ID: number): Promise<Sensor[]> {
    const sensors = this.sensorsRepository.find({ where: { user: { ID: user_ID } } });
    if (sensors) {
      return sensors
    } else {
      throw new NotFoundException(`Can not get sensor`)
    }
  }
  async createNewSensor(createSensorDto: CreateSensorDto, user_id: number): Promise<String> {
    try {
      const sensor = this.sensorsRepository.create(createSensorDto)
      const user = await this.userService.findUserbyId(user_id)
      sensor.user = user;
      await this.sensorsRepository.save(sensor)
      return "Create Success"
    } catch {
      throw new NotFoundException(`Can not create new sensor`)
    }
  }
  async updateSensor(updateSensorDto: UpdateSensorDto, sensor_id: number): Promise<String> {
    try {
      const sensor = await this.sensorsRepository.findOne({ where: {ID: sensor_id}});
      Object.assign(sensor, updateSensorDto)
      await this.sensorsRepository.save(sensor)
      return "Update Success"
    } catch {
      throw new NotFoundException(`Can not update sensor`)
    }
  }
 
  async deleteSensor(sensor_id: number): Promise<String> {
    try {
      const sensor = await this.sensorsRepository.findOne({ where: {ID: sensor_id}});
      await this.sensorsRepository.remove(sensor)
      return "Delete Success"
    } catch {
      throw new NotFoundException(`Can not delete sensor`)
    }
  }
}
