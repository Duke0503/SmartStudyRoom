import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { SignUpDto } from 'src/common/dto/sign-up.dto';
import { SignInDto } from 'src/common/dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { getExpiry, isTokenExpired } from 'src/common/utils/dateTimeUltility';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config'
import { generateOTP } from 'src/common/utils/codeGenerator';
import * as bcrypt from 'bcrypt';
import { timestamp } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // Mail Transport
  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST'),
      port: this.configService.get('EMAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('EMAIL_USERNAME'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });

    return transporter;
  }
  // End Mail Transport

  // Sign Up
  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { email } = signUpDto;
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new HttpException('User already registered', HttpStatus.FOUND);
    }
    return await this.usersService.signUp(signUpDto);
  }
  // End Sign Up

  // Create Email Token
  async createEmailToken(email: string): Promise<boolean> {
    var user = await this.usersRepository.findOne({
      where: {
        email: email,
      }
    })

    if (user && !isTokenExpired(user.timestamp)) {
      throw new HttpException('LOGIN.EMAIL_SENT_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
    } else {

      user.emailToken = generateOTP(6);
      user.timestamp = getExpiry();

      await this.usersRepository.save(user);

      return true;
    }
  }
  // End Create Email Token

  // Send Email Forgot Password
  async sendEmailForgotPassword(email: string): Promise<boolean> {
    var user = await this.usersRepository.findOne({
      where: {
        email: email,
      }
    })

    if (!user) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    
    var token = await this.createForgottenPasswordToken(email);
    
    if (token && token.emailToken) {

      let transporter = this.mailTransport()
      let mailOptions = {
        from: '"I-Learning App:" <' + this.configService.get('EMAIL_USERNAME') + '>',
        to: email,
        subject: 'Forgotten Password',
        text: 'Forgotten Password',
        html: 'Hi! <br><br> If you requested to reset your password<br><br>' + token.emailToken
      };

      var sent = await new Promise<boolean>(async function(resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {  

            return reject(false);
          }

          resolve(true);
        });
      })

      return sent;
    } else {
      throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
    }
  }
  // End Send Email Forgot Password

  // Create Forgotten Password Token
  async createForgottenPasswordToken(email: string): Promise<User> {
    var user = await this.usersRepository.findOne({
      where: {
        email: email,
      }
    })

    if (user && !isTokenExpired(user.timestamp)){
      
      throw new HttpException('RESET_PASSWORD.EMAIL_SENT_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      user.emailToken = generateOTP(6);
      user.timestamp = getExpiry();

      await this.usersRepository.save(user);

      return user;
    }
  }
  // End Create Forgotten Password Token

  // Get Forgotten Password Model
  async getForgottenPasswordModel(newPasswordToken: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
       emailToken: newPasswordToken}
      });
  }  
  // End Get Forgotten Password Model

  // Verify Reset Email
  async verifyResetEmail(token: string): Promise<Boolean> {
    var user = await this.usersRepository.findOne({
      where: {
        emailToken: token,
      }
    });

    if (user && !isTokenExpired(user.timestamp)) {
      return true;
    } else {
      throw new HttpException('LOGIN.EMAIL_CODE_NOT_VALID', HttpStatus.FORBIDDEN);
    }

  }
  // End Verify Reset Email

  // Send Email Verification
  async sendEmailVerification(email: string): Promise<boolean> {
    var user = await this.usersRepository.findOne({
      where: {
        email: email
      }
    });

    if (user && user.emailToken) {
      let transporter = this.mailTransport();

      let mailOptions = {  
        from: '"I-Learning App:" <' + this.configService.get('EMAIL_USERNAME') + '>',
        to: email,
        subject: 'Verify Email',
        text: 'Verify Email',
        html: 'Hi! <br><br> Thanks for your registration <br><br>' + 
          '<a href=http://'+ this.configService.get('HOST')+ ':' + this.configService.get('PORT') +'/auth/email/verify/'+ user.emailToken + '>Click here</a>' 
      }

      var sent = await new Promise<boolean>(async function(resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {      
              console.log('Message sent: %s', error);
              return reject(false);
            }
            console.log('Message sent: %s', info.messageId);
            resolve(true);
        });      
      })

      return sent;

    } else {
      throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
    }
  }
  // End Send Email Verification

  // Verify Email
  async verifyEmail(token: string): Promise<boolean> {
    var user = await this.usersRepository.findOne({
      where: {
        emailToken: token
      }
    });

    if(user && !isTokenExpired(user.timestamp)){
      
      user.isVerified = true;

      this.usersRepository.save(user);

      return true;

    } else {
      throw new HttpException('LOGIN.EMAIL_CODE_NOT_VALID', HttpStatus.FORBIDDEN);
    }
  }
  // End Verify Email

  // Validate Login
  async validateLogin(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      }
    });


    if (!user) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    if (!user.isVerified) throw new HttpException('LOGIN.EMAIL_NOT_VERIFIED', HttpStatus.FORBIDDEN);

    if(!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      user: user     
    }

    return {
      id: user.ID,
      token: await this.jwtService.signAsync(payload),
      name: user.name,
      email: user.email,
      birthday: user.birthday,
      phone_number: user.phone_number,
      gender: user.gender,
      roles: user.roles,
      supervisorID: user.supervisorID,
    };
  }
  // End Validate Login
}
