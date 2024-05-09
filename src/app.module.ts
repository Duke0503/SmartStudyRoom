import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/database';
import { UsersModule } from './modules/users/users.module';
import { SensorsModule } from './modules/sensors/sensors.module';
import { AuthModule } from './modules/auth/auth.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
<<<<<<< HEAD
import { HomeModule } from './modules/home/home.module';
=======
import { DevicesModule} from './modules/devices/devices.module'

>>>>>>> 1a4774b3f32118d49f15ff268e738f29d73a1b0e

@Module({
  imports: [    
    ConfigModule.forRoot({
      envFilePath: '.env',
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
