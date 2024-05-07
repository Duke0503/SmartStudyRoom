import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { SignUpDto } from 'src/helpers/dto/auth/sign-up.dto';
import { SignInDto } from 'src/helpers/dto/auth/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Sign Up
  async signUp(signUpDto: SignUpDto) {
    const { name, phone_number, password } = signUpDto;
    const user = await this.usersService.findByPhone(phone_number);

    if (user) {
      throw new HttpException('User already registered', HttpStatus.FOUND);
    }

    return await this.usersService.signUp(signUpDto);
  }
  // End Sign Up

  async signIn(signInDto: SignInDto) {

    const { phone_number, password } = signInDto;

    const user = await this.usersService.findByPhone(phone_number);

    if(!(await user?.validationPassword(password))) {
      throw new UnauthorizedException();
    }

    const payload = {
      ID: user.ID,
      phone_number: user.phone_number,
      email: user.email,
      roles: user.roles,     
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
