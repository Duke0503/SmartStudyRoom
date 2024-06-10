import { 
  Controller, 
  Get, Post, Patch, Delete,
  Body, 
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { UpdateUserDto } from '../../common/dto/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UpdatePassword } from 'src/common/dto/update-password.dto';
import { ResponseError } from 'src/common/dto/response.dto';
import { Sensor } from 'src/entities/sensors.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  // GET : users/profile
  @UseGuards(AuthGuard)
  @Get('profile/:id')
  getProfile(@Param('id') id: number) {
    return this.usersService.findUserbyId(id);
  }

  // PATCH : users/edit/profile
  @UseGuards(AuthGuard)
  @Patch('edit/profile/:id')
  editProfile(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(id, updateUserDto);
  }

  // @UseGuards(AuthGuard)
  @Patch('edit/addsensor/:user_id/:sensor_id')
  addSensor(@Param('user_id') user_id: number, @Param('sensor_id') sensor_id: number) {
    return this.usersService.addSensor(user_id, sensor_id);
  }
  // PATCH : users/edit/password
  @UseGuards(AuthGuard)
  @Patch('edit/password/:id')
  async editPassword(@Param('id') id: number, @Body() updatePassword: UpdatePassword) {

    var isValidPassword = await this.usersService.checkPassword(id, updatePassword.current_password);

    if (isValidPassword) {
      this.usersService.setPassword(id, updatePassword.new_password);
    } else {
      return new ResponseError("RESET_PASSWORD.WRONG_CURRENT_PASSWORD");
    }
  }

}
