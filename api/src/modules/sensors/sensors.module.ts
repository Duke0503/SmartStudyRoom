import { Module } from '@nestjs/common';
import { SensorsService } from 'src/services/sensors/sensors.service';
import { SensorsController } from '../../controllers/sensors/sensors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from 'src/entities/sensors.entity';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorSchema, Sensors } from 'src/models/sensors.models';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sensor]),
    MongooseModule.forFeature([{ name: Sensors.name, schema: SensorSchema }]),
    UsersModule
  ],
  controllers: [SensorsController],
  providers: [SensorsService],
  exports: [SensorsService],
})
export class SensorsModule {}