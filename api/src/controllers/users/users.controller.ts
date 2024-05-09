import { 
  Controller, 
  Get, Post, Patch, Delete,
  Body, 
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { UpdateUserDto } from '../../common/dto/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UpdatePassword } from 'src/common/dto/update-password.dto';
import { ResponseError } from 'src/common/dto/response.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  // GET : users/profile
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // PATCH : users/edit/profile
  @UseGuards(AuthGuard)
  @Patch('edit/profile')
  editProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(req.user.email, updateUserDto);
  }

  // PATCH : users/edit/password
  @UseGuards(AuthGuard)
  @Patch('edit/password')
  async editPassword(@Request() req, @Body() updatePassword: UpdatePassword) {
    var isValidPassword = await this.usersService.checkPassword(req.user.email, updatePassword.current_password);

    if (isValidPassword) {
      this.usersService.setPassword(req.user.email, updatePassword.new_password);
    } else {
      return new ResponseError("RESET_PASSWORD.WRONG_CURRENT_PASSWORD");
    }
  }

}
