import { Module } from '@nestjs/common';
import { SensorsService } from 'src/services/sensors/sensors.service';
import { SensorsController } from '../../controllers/sensors/sensors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from 'src/entities/sensors.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sensor]),
    UsersModule
  ],
  controllers: [SensorsController],
  providers: [SensorsService],
  exports: [SensorsService],
})
export class SensorsModule {}