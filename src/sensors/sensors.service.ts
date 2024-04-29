import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSensorDto } from 'src/helper/dto/sensors/create-sensor.dto';
import { UpdateSensorDto } from 'src/helper/dto/sensors/update-sensor.dto';
import { Repository } from 'typeorm';
import { Sensor } from 'src/entities/sensors.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorsRepository: Repository<Sensor>
  ){}

  async create(createSensorDto: CreateSensorDto) {
    const sensor = this.sensorsRepository.create(createSensorDto);

    return await this.sensorsRepository.save(sensor);
  }

  async findAll() {
    return await this.sensorsRepository.find();
  }

  async findOne(ID: number) {
    return await this.sensorsRepository.findOne( {
      where: {ID}
    });
  }

  async update(ID: number, updateSensorDto: UpdateSensorDto) {
    const sensor = await this.findOne(ID);

    if (!sensor) {
      throw new NotFoundException();
    }

    Object.assign(sensor, updateSensorDto);

    return await this.sensorsRepository.save(sensor);
  }

  async remove(ID: number) {
    const sensor = await this.findOne(ID);

    if (!sensor) {
      throw new NotFoundException();
    }

    return await this.sensorsRepository.remove(sensor);
  }
}
