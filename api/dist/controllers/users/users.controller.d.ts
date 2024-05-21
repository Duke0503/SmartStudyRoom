import { UsersService } from 'src/services/users/users.service';
import { UpdateUserDto } from '../../common/dto/update-user.dto';
import { UpdatePassword } from 'src/common/dto/update-password.dto';
import { ResponseError } from 'src/common/dto/response.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): any;
    editProfile(req: any, updateUserDto: UpdateUserDto): Promise<import("../../entities/users.entity").User>;
    editPassword(req: any, updatePassword: UpdatePassword): Promise<ResponseError>;
}
