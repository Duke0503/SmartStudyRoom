import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/database';
import { UsersModule } from './modules/users/users.module';
import { SensorsModule } from './modules/sensors/sensors.module';
import { DevicesModule} from './modules/devices/devices.module'
import { AuthModule } from './auth/auth.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { HomeModule } from './modules/home/home.module';

@Module({
  imports: [    
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(config),
    UsersModule,
    SensorsModule,
    DevicesModule,
    AuthModule,
    SchedulesModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
