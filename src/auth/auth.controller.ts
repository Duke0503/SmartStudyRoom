import {
  Controller, 
  Post, 
  Body,
  Get,
  HttpCode,
  HttpStatus, 
  Request,
  UseGuards
} from '@nestjs/common';
import { SignUpDto } from 'src/helpers/dto/auth/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/helpers/dto/auth/sign-in.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
