import { Controller, Get, Post, Param, Res, Body, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { HomeService } from 'src/services/home/home.service';
import { addManagedUserDto } from 'src/common/dto/add-managed-user.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { ResponseError, ResponseSuccess } from 'src/common/dto/response.dto';
import { User } from 'src/entities/users.entity';

@Controller('homeadmin')
export class HomeController {
    constructor(
        private readonly homeService: HomeService
    ) { }

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

    @Get('email/verify/:token/:supervisor_id')
    public async verifyEmail(@Param('token') token: string, @Param('supervisor_id') supervisorId: number): Promise<IResponse> {
        try {
            var isEmailVerified = await this.homeService.verifyEmail(token, supervisorId);
            return new ResponseSuccess("ADD_MANAGED_USER.EMAIL_VERIFIED", isEmailVerified);
        } catch (error) {
            return new ResponseError("ADD_MANAGED_USER.ERROR", error);
        }
    }

    @Get('getManagedUser/:user_id')
    getManagedUser(@Param('user_id') user_id: number): Promise<User[]> {
        // console.log('user_id', user_id);
        return this.homeService.getManagedUserBySupervisorID(user_id);
    }

    @Patch('removeSupervisorID/:user_id')
    removeSupervisorID(@Param('user_id') user_id: number) {
        return this.homeService.removeSupervisorIDField(user_id);
    }
}