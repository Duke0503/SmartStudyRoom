import { UpdateUserDto } from '../../common/dto/update-user.dto';
import { SignUpDto } from 'src/common/dto/sign-up.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';
import { ConfigService } from '@nestjs/config';
export declare class UsersService {
    private readonly usersRepository;
    private readonly configService;
    constructor(usersRepository: Repository<User>, configService: ConfigService);
    signUp(signupDto: SignUpDto): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
    updateProfile(username: string, updateUserDto: UpdateUserDto): Promise<User>;
    checkPassword(email: string, password: string): Promise<boolean>;
    setPassword(email: string, newPassword: string): Promise<boolean>;
    findUserbyId(ID: number): Promise<User>;
}
