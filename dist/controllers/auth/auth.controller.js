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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const sign_up_dto_1 = require("../../common/dto/sign-up.dto");
const auth_service_1 = require("../../services/auth/auth.service");
const sign_in_dto_1 = require("../../common/dto/sign-in.dto");
const response_dto_1 = require("../../common/dto/response.dto");
const reset_password_dto_1 = require("../../common/dto/reset-password.dto");
const users_service_1 = require("../../services/users/users.service");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async register(signUpDto) {
        try {
            var user = await this.authService.signUp(signUpDto);
            await this.authService.createEmailToken(user.email);
            var sent = await this.authService.sendEmailVerification(user.email);
            if (sent) {
                return new response_dto_1.ResponseSuccess("REGISTRATION.USER_REGISTERED_SUCCESSFULLY");
            }
            else {
                return new response_dto_1.ResponseError("REGISTRATION.ERROR.MAIL_NOT_SENT");
            }
        }
        catch (error) {
            return new response_dto_1.ResponseError("REGISTRATION.ERROR.GENERIC_ERROR", error);
        }
    }
    async verifyEmail(params) {
        try {
            var isEmailVerified = await this.authService.verifyEmail(params.token);
            return new response_dto_1.ResponseSuccess("LOGIN.EMAIL_VERIFIED", isEmailVerified);
        }
        catch (error) {
            return new response_dto_1.ResponseError("LOGIN.ERROR", error);
        }
    }
    async sendEmailVerification(params) {
        try {
            await this.authService.createEmailToken(params.email);
            var isEmailSent = await this.authService.sendEmailVerification(params.email);
            if (isEmailSent) {
                return new response_dto_1.ResponseSuccess("LOGIN.EMAIL_RESENT", null);
            }
            else {
                return new response_dto_1.ResponseError("REGISTRATION.ERROR.MAIL_NOT_SENT");
            }
        }
        catch (error) {
            return new response_dto_1.ResponseError("LOGIN.ERROR.SEND_EMAIL", error);
        }
    }
    async signIn(signInDto) {
        try {
            var response = await this.authService.validateLogin(signInDto.email, signInDto.password);
            return new response_dto_1.ResponseSuccess("LOGIN.SUCCESS", response);
        }
        catch (error) {
            return new response_dto_1.ResponseError("LOGIN.ERROR", error);
        }
    }
    async sendEmailForgotPassword(params) {
        try {
            var isEmailSent = await this.authService.sendEmailForgotPassword(params.email);
            if (isEmailSent) {
                return new response_dto_1.ResponseSuccess("LOGIN.EMAIL_RESENT", null);
            }
            else {
                return new response_dto_1.ResponseError("REGISTRATION.ERROR.MAIL_NOT_SENT");
            }
        }
        catch (error) {
            return new response_dto_1.ResponseError("LOGIN.ERROR.SEND_EMAIL", error);
        }
    }
    async setNewPassword(resetPasswordDto) {
        try {
            var isNewPasswordChanged = false;
            if (resetPasswordDto.newPasswordToken) {
                var user = await this.authService.getForgottenPasswordModel(resetPasswordDto.newPasswordToken);
                isNewPasswordChanged = await this.usersService.setPassword(user.email, resetPasswordDto.newPassword);
            }
            else {
                return new response_dto_1.ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR");
            }
            return new response_dto_1.ResponseSuccess("RESET_PASSWORD.PASSWORD_CHANGED", isNewPasswordChanged);
        }
        catch (error) {
            return new response_dto_1.ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR", error);
        }
    }
    async verifyResetEmail(params) {
        try {
            var isEmailVerified = await this.authService.verifyResetEmail(params.token);
            return new response_dto_1.ResponseSuccess("LOGIN.EMAIL_VERIFIED", isEmailVerified);
        }
        catch (error) {
            return new response_dto_1.ResponseError("LOGIN.ERROR", error);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('email/verify/:token'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Get)('email/resend-verification/:email'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendEmailVerification", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)('email/forgot-password/:email'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendEmailForgotPassword", null);
__decorate([
    (0, common_1.Post)('email/reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setNewPassword", null);
__decorate([
    (0, common_1.Get)('email/reset-password/:token'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyResetEmail", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map