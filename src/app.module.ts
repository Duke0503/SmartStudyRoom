import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/database';
import { UsersModule } from './modules/users/users.module';
import { SensorsModule } from './modules/sensors/sensors.module';
import { SchedulesModule } from './modules/schedules/schedules.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    TypeOrmModule.forRootAsync(config),
    UsersModule,
    SensorsModule,
    SchedulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
