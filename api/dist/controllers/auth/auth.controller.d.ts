import { SignUpDto } from 'src/common/dto/sign-up.dto';
import { AuthService } from '../../services/auth/auth.service';
import { SignInDto } from 'src/common/dto/sign-in.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { ResetPasswordDto } from 'src/common/dto/reset-password.dto';
import { UsersService } from 'src/services/users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(signUpDto: SignUpDto): Promise<IResponse>;
    verifyEmail(params: any): Promise<IResponse>;
    sendEmailVerification(params: any): Promise<IResponse>;
    signIn(signInDto: SignInDto): Promise<IResponse>;
    sendEmailForgotPassword(params: any): Promise<IResponse>;
    setNewPassword(resetPasswordDto: ResetPasswordDto): Promise<IResponse>;
    verifyResetEmail(params: any): Promise<IResponse>;
}
