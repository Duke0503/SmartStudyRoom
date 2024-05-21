"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const users_entity_1 = require("../../entities/users.entity");
const dateTimeUltility_1 = require("../../common/utils/dateTimeUltility");
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
const codeGenerator_1 = require("../../common/utils/codeGenerator");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersRepository, usersService, jwtService, configService) {
        this.usersRepository = usersRepository;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
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
    async signUp(signUpDto) {
        const { name, email, password } = signUpDto;
        const user = await this.usersService.findByEmail(email);
        if (user) {
            throw new common_1.HttpException('User already registered', common_1.HttpStatus.FOUND);
        }
        return await this.usersService.signUp(signUpDto);
    }
    async createEmailToken(email) {
        var user = await this.usersRepository.findOne({
            where: {
                email: email,
            }
        });
        if (user && !(0, dateTimeUltility_1.isTokenExpired)(user.timestamp)) {
            throw new common_1.HttpException('LOGIN.EMAIL_SENT_RECENTLY', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            user.emailToken = (0, codeGenerator_1.generateOTP)(6);
            user.timestamp = (0, dateTimeUltility_1.getExpiry)();
            await this.usersRepository.save(user);
            return true;
        }
    }
    async sendEmailForgotPassword(email) {
        var user = await this.usersRepository.findOne({
            where: {
                email: email,
            }
        });
        if (!user)
            throw new common_1.HttpException('LOGIN.USER_NOT_FOUND', common_1.HttpStatus.NOT_FOUND);
        var token = await this.createForgottenPasswordToken(email);
        if (token && token.emailToken) {
            let transporter = this.mailTransport();
            let mailOptions = {
                from: '"I-Learning App:" <' + this.configService.get('EMAIL_USERNAME') + '>',
                to: email,
                subject: 'Forgotten Password',
                text: 'Forgotten Password',
                html: 'Hi! <br><br> If you requested to reset your password<br><br>' + '<a href=http://' + this.configService.get('HOST') + ':' + this.configService.get('PORT') + '/auth/email/reset-password/' + token.emailToken + '>Click here</a>'
            };
            var sent = await new Promise(async function (resolve, reject) {
                return await transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        return reject(false);
                    }
                    resolve(true);
                });
            });
            return sent;
        }
        else {
            throw new common_1.HttpException('REGISTER.USER_NOT_REGISTERED', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async createForgottenPasswordToken(email) {
        var user = await this.usersRepository.findOne({
            where: {
                email: email,
            }
        });
        if (user && !(0, dateTimeUltility_1.isTokenExpired)(user.timestamp)) {
            throw new common_1.HttpException('RESET_PASSWORD.EMAIL_SENT_RECENTLY', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            user.emailToken = (0, codeGenerator_1.generateOTP)(6);
            user.timestamp = (0, dateTimeUltility_1.getExpiry)();
            await this.usersRepository.save(user);
            return user;
        }
    }
    async getForgottenPasswordModel(newPasswordToken) {
        return await this.usersRepository.findOne({
            where: {
                emailToken: newPasswordToken
            }
        });
    }
    async verifyResetEmail(token) {
        var user = await this.usersRepository.findOne({
            where: {
                emailToken: token,
            }
        });
        if (user && !(0, dateTimeUltility_1.isTokenExpired)(user.timestamp)) {
            return true;
        }
        else {
            throw new common_1.HttpException('LOGIN.EMAIL_CODE_NOT_VALID', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async sendEmailVerification(email) {
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
                    '<a href=http://' + this.configService.get('HOST') + ':' + this.configService.get('PORT') + '/auth/email/verify/' + user.emailToken + '>Click here</a>'
            };
            var sent = await new Promise(async function (resolve, reject) {
                return await transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        console.log('Message sent: %s', error);
                        return reject(false);
                    }
                    console.log('Message sent: %s', info.messageId);
                    resolve(true);
                });
            });
            return sent;
        }
        else {
            throw new common_1.HttpException('REGISTER.USER_NOT_REGISTERED', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async verifyEmail(token) {
        var user = await this.usersRepository.findOne({
            where: {
                emailToken: token
            }
        });
        if (user && !(0, dateTimeUltility_1.isTokenExpired)(user.timestamp)) {
            user.isVerified = true;
            this.usersRepository.save(user);
            return true;
        }
        else {
            throw new common_1.HttpException('LOGIN.EMAIL_CODE_NOT_VALID', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async validateLogin(email, password) {
        const user = await this.usersRepository.findOne({
            where: {
                email: email,
            }
        });
        if (!user)
            throw new common_1.HttpException('LOGIN.USER_NOT_FOUND', common_1.HttpStatus.NOT_FOUND);
        if (!user.isVerified)
            throw new common_1.HttpException('LOGIN.EMAIL_NOT_VERIFIED', common_1.HttpStatus.FORBIDDEN);
        if (!bcrypt.compareSync(password, user.password)) {
            throw new common_1.UnauthorizedException();
        }
        const payload = {
            user: user
        };
        return {
            id: user.ID,
            token: await this.jwtService.signAsync(payload),
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            phone_number: user.phone_number,
            gender: user.gender,
            roles: user.roles,
            supervisor: user.supervisor,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map