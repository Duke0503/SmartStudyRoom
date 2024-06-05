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

  async getSensorBySensorId(sensor_ID: string): Promise<Sensor> {
    const sensors = this.sensorsRepository.findOne({ where: { id_sensor: sensor_ID } });
    if (sensors) {
      return sensors;
    } else {
      throw new NotFoundException(`Can not get sensor`);
    }
  }

  // async getSensorByUserId(user_ID: number): Promise<Sensor[]> {
  //   const sensors = this.sensorsRepository.find({ where: { user: { ID: user_ID } } });
  //   if (sensors) {
  //     return sensors
  //   } else {
  //     throw new NotFoundException(`Can not get sensor`)
  //   }
  // }
  async getSensorByIP(ip: string): Promise<Sensor[]> {
    const sensors = await this.sensorsRepository.find({ where: { ip_address: ip } });
    if (sensors && sensors.length > 0) {
      return sensors;
    } else {
      throw new NotFoundException(`Cannot get sensor with IP address ${ip}`);
    }
  }

  async createNewSensor(createSensorDto: CreateSensorDto, sensor_id: string): Promise<String> {
    try {
      const sensor = this.sensorsRepository.create(createSensorDto);
      //const user = await this.userService.findUserbyId(user_id)
      // sensor.user = user;
      sensor.id_sensor = sensor_id;
      sensor.is_active = false;
      await this.sensorsRepository.save(sensor);
      return "Create Success";
    } catch {
      throw new NotFoundException(`Can not create new sensor`);
    }
  }

  // async createNewSensor(createSensorDto: CreateSensorDto, user_id: number): Promise<String> {
  //   try {
  //     const sensor = this.sensorsRepository.create(createSensorDto)
  //     const user = await this.userService.findUserbyId(user_id)
  //     sensor.user = user;
  //     await this.sensorsRepository.save(sensor)
  //     return "Create Success"
  //   } catch {
  //     throw new NotFoundException(`Can not create new sensor`)
  //   }
  // }

  async updateSensor(updateSensorDto: UpdateSensorDto, sensor_id: string): Promise<String> {
    try {
      const sensor = await this.sensorsRepository.findOne({ where: {id_sensor: sensor_id}});
      Object.assign(sensor, updateSensorDto);
      await this.sensorsRepository.save(sensor);
      return "Update Success";
    } catch {
      throw new NotFoundException(`Can not update sensor`);
    }
  }
 
  async deleteSensor(sensor_id: number): Promise<String> {
    try {
      const sensor = await this.sensorsRepository.findOne({ where: {ID: sensor_id}});
      await this.sensorsRepository.remove(sensor);
      return "Delete Success";
    } catch {
      throw new NotFoundException(`Can not delete sensor`);
    }
  }
}