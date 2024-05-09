import { Module } from '@nestjs/common';
import { DevicesService } from 'src/services/devices/devices.service';
import { DevicesController} from '../../controllers/devices/devices.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from 'src/entities/devices.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Device]), UsersModule],
  controllers: [DevicesController],
  providers: [DevicesService], 
})
export class DevicesModule {}
