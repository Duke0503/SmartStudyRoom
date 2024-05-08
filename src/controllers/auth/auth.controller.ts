import {
  Controller, 
  Post, 
  Body,
  Get,
  HttpCode,
  HttpStatus, 
  Param
} from '@nestjs/common';
import { SignUpDto } from 'src/common/dto/sign-up.dto';
import { AuthService } from '../../services/auth/auth.service';
import { SignInDto } from 'src/common/dto/sign-in.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { ResponseError, ResponseSuccess } from 'src/common/dto/response.dto';
import { ResetPasswordDto } from 'src/common/dto/reset-password.dto';
import { UsersService } from 'src/services/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() signUpDto: SignUpDto): Promise<IResponse> {
    try { 
      var user = await this.authService.signUp(signUpDto);
      await this.authService.createEmailToken(user.email);

      var sent = await this.authService.sendEmailVerification(user.email);

      if(sent){
        return new ResponseSuccess("REGISTRATION.USER_REGISTERED_SUCCESSFULLY");
      } else {
        return new ResponseError("REGISTRATION.ERROR.MAIL_NOT_SENT");
      }
    } catch(error){
      return new ResponseError("REGISTRATION.ERROR.GENERIC_ERROR", error);
    }
  }

  @Get('email/verify/:token')
  public async verifyEmail(@Param() params): Promise<IResponse> {
    try {
      var isEmailVerified = await this.authService.verifyEmail(params.token);
      return new ResponseSuccess("LOGIN.EMAIL_VERIFIED", isEmailVerified);
    } catch(error) {
      return new ResponseError("LOGIN.ERROR", error);
    }
  }

  @Get('email/resend-verification/:email')
  public async sendEmailVerification(@Param() params): Promise<IResponse> {
    try {
      await this.authService.createEmailToken(params.email);
      var isEmailSent = await this.authService.sendEmailVerification(params.email);
      if(isEmailSent){
        return new ResponseSuccess("LOGIN.EMAIL_RESENT", null);
      } else {
        return new ResponseError("REGISTRATION.ERROR.MAIL_NOT_SENT");
      }
    } catch(error) {
      return new ResponseError("LOGIN.ERROR.SEND_EMAIL", error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async signIn(@Body() signInDto: SignInDto): Promise<IResponse> {
    try {
      var response = await this.authService.validateLogin(signInDto.email, signInDto.password);
      return new ResponseSuccess("LOGIN.SUCCESS", response);
    } catch(error) {
      return new ResponseError("LOGIN.ERROR", error);
    }  
  }

  @Get('email/forgot-password/:email')
  public async sendEmailForgotPassword(@Param() params): Promise<IResponse> {
    try {
      var isEmailSent = await this.authService.sendEmailForgotPassword(params.email);
      if (isEmailSent) {
        return new ResponseSuccess("LOGIN.EMAIL_RESENT", null);
      } else {
        return new ResponseError("REGISTRATION.ERROR.MAIL_NOT_SENT");
      }
    } catch(error) {
      return new ResponseError("LOGIN.ERROR.SEND_EMAIL", error);
    }
  }

  @Post('email/reset-password')
  @HttpCode(HttpStatus.OK)
  public async setNewPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<IResponse> {
    try {
      var isNewPasswordChanged: boolean = false;

      if (resetPasswordDto.newPasswordToken) {
        var user = await this.authService.getForgottenPasswordModel(resetPasswordDto.newPasswordToken);

        isNewPasswordChanged = await this.usersService.setPassword(user.email, resetPasswordDto.newPassword);
      
      } else {
        return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR");
      } 

      return new ResponseSuccess("RESET_PASSWORD.PASSWORD_CHANGED", isNewPasswordChanged);
    
    } catch(error) {
      return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR", error);
    }
  }

  @Get('email/reset-password/:token')
  public async verifyResetEmail(@Param() params): Promise<IResponse> {
    try {
      var isEmailVerified = await this.authService.verifyResetEmail(params.token);
      return new ResponseSuccess("LOGIN.EMAIL_VERIFIED", isEmailVerified);
    } catch(error) {
      return new ResponseError("LOGIN.ERROR", error)
    }
  }
}
