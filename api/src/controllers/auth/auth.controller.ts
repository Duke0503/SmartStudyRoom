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
  public async verifyEmail(@Param() params): Promise<string> {
    try {
      var isEmailVerified = await this.authService.verifyEmail(params.token);
      if (isEmailVerified) {
        return `          
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verified</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            h1 { color: #4CAF50; }
            p { font-size: 16px; }
            a { color: #4CAF50; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email Verification Successful</h1>
            <p>Your email has been verified successfully. You can now login</a>.</p>
          </div>
        </body>
        </html>`;
      } else {
        return `          
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification Failed</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            h1 { color: #f44336; }
            p { font-size: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email Verification Failed</h1>
            <p>Invalid or expired token. Please try again.</p>
          </div>
        </body>
        </html>`;
      }

    } catch(error) {
      return `        
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification Failed</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
          h1 { color: #f44336; }
          p { font-size: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Email Verification Failed</h1>
          <p>Invalid or expired token. Please try again.</p>
        </div>
      </body>
      </html>`
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

        isNewPasswordChanged = await this.usersService.setPassword(user.ID, resetPasswordDto.newPassword);
      
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
