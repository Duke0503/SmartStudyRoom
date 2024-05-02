import { Module } from '@nestjs/common';
import { SensorsService } from 'src/services/sensors/sensors.service';
import { SensorsController } from '../../controllers/sensors/sensors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from 'src/entities/sensors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor])],
  controllers: [SensorsController],
  providers: [SensorsService],
})
export class SensorsModule {}
