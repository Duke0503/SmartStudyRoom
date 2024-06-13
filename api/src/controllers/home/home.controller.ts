import { Controller, Get, Post, Param, Res, Body, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { HomeService } from 'src/services/home/home.service';
import { addManagedUserDto } from 'src/common/dto/add-managed-user.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { ResponseError, ResponseSuccess } from 'src/common/dto/response.dto';
import { User } from 'src/entities/users.entity';
import { UsersService } from 'src/services/users/users.service';

@Controller('homeadmin')
export class HomeController {
    constructor(
        private readonly homeService: HomeService,
        private readonly usersService: UsersService,
    ) { }

    // Request Add User 
    @Post('addManagedUser/:user_id')
    @HttpCode(HttpStatus.OK)
    async sendVerifyRequest(
        @Body() addManagedUserDto: addManagedUserDto,
        @Param('user_id') user_id: number): Promise<IResponse> {
        try {
            var user = await this.homeService.addManagedUser(addManagedUserDto, user_id);

            var sent = await this.homeService.sendEmailVerification(user.email, user_id);

            if (sent) {
                return new ResponseSuccess("SEND_REQUEST.ADD_MANAGED_USER_SUCCESSFULLY");
            } else {
                return new ResponseError("SEND_REQUEST.ERROR.MAIL_NOT_SENT");
            }
        } catch (error) {
            return new ResponseError("SEND_REQUEST.ERROR.GENERIC_ERROR", error);
        }
    }

    // Verify Email
    @Get('email/verify/:token/:supervisor_id')
    public async verifyEmail(@Param('token') token: string, @Param('supervisor_id') supervisorId: number): Promise<string> {
        try {
            var isEmailVerified = await this.homeService.verifyEmail(token, supervisorId);
            const supervisor = await this.usersService.findUserbyId(supervisorId);
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
                    <h1>Xác nhận Email thành công</h1>
                    <p>Email của bạn đã được xác nhận. Tài khoản hiện được quản lý bởi ${supervisor.name}</a>.</p>
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
                    <h1>Xác nhận Email không thành công</h1>
                    <p>Yêu cầu không thành công. Vui lòng thử lại.</p>
                  </div>
                </body>
                </html>`;
            }
            // return new ResponseSuccess("ADD_MANAGED_USER.EMAIL_VERIFIED", isEmailVerified);
        } catch (error) {
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
                <h1>Xác nhận Email không thành công</h1>
                <p>Yêu cầu không thành công. Vui lòng thử lại.</p>
                </div>
            </body>
            </html>`
            // return new ResponseError("ADD_MANAGED_USER.ERROR", error);
        }
    }

    // Get Managed User List
    @Get('getManagedUser/:user_id')
    getManagedUser(@Param('user_id') user_id: number): Promise<User[]> {
        // console.log('user_id', user_id);
        return this.homeService.getManagedUserBySupervisorID(user_id);
    }

    // Delete a User from the user list
    @Patch('removeSupervisorID/:user_id')
    removeSupervisorID(@Param('user_id') user_id: number) {
        return this.homeService.removeSupervisorIDField(user_id);
    }
}