import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { CreateUserDto } from '../../helpers/dto/users/create-user.dto';
import { UpdateUserDto } from '../../helpers/dto/users/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Patch('edit')
  editProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(req.phone_number, updateUserDto);
  }

}
