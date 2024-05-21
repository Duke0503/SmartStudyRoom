import { UsersService } from 'src/services/users/users.service';
import { SignUpDto } from 'src/common/dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly usersRepository;
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersRepository: Repository<User>, usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    mailTransport(): nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    signUp(signUpDto: SignUpDto): Promise<User>;
    createEmailToken(email: string): Promise<boolean>;
    sendEmailForgotPassword(email: string): Promise<boolean>;
    createForgottenPasswordToken(email: string): Promise<User>;
    getForgottenPasswordModel(newPasswordToken: string): Promise<User>;
    verifyResetEmail(token: string): Promise<boolean>;
    sendEmailVerification(email: string): Promise<boolean>;
    verifyEmail(token: string): Promise<boolean>;
    validateLogin(email: string, password: string): Promise<{
        id: number;
        token: string;
        name: string;
        email: string;
        birthday: Date;
        phone_number: string;
        gender: string;
        roles: string;
        supervisor: string;
    }>;
}
