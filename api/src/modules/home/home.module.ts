import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import{User} from 'src/entities/home.entity';
import { HomeController } from 'src/controllers/home/home.controller';
import { HomeService } from 'src/services/home/home.service';
import { UsersModule } from '../users/users.module';
import { User } from 'src/entities/users.entity';


@Module({
    imports: [
      TypeOrmModule.forFeature([User]), 
      UsersModule],
    controllers: [HomeController],
    providers: [HomeService], 
  })
  export class HomeModule {}