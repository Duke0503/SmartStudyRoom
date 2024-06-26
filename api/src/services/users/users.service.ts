import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from '../../common/dto/update-user.dto';
import { SignUpDto } from 'src/common/dto/sign-up.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ){}

  // Sign Up
  async signUp(signupDto: SignUpDto): Promise<User> {
    signupDto.password = bcrypt.hashSync(signupDto.password, Number(process.env.BCRYPT_SALT_ROUND));
    const user = this.usersRepository.create(signupDto);

    await this.usersRepository.save(user);

    return user;
  }
  // End Sign Up

  // Find User By Email
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      }
    })
  }
  // End User By Email
  
  // Edit Profile
  async updateProfile(userID: number, updateUserDto: UpdateUserDto) {
    const user = await this.findUserbyId(userID);

    if (!user) {
      throw new NotFoundException();
    };

    Object.assign(user, updateUserDto);

    const userEdit =  await this.usersRepository.save(user);

    console.log(new Date());
    console.log(new Date().toString());
    return userEdit;
  }
  // End Edit Profile

  // Check Password
  async checkPassword(userID: number, password: string): Promise<boolean> {
    const user = await this.findUserbyId(userID);
    
    if(!user) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    if(!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }

    return true;
  }
  // End Check Password

  // Set Password
  async setPassword(userID: number, newPassword: string): Promise<boolean> { 
    var user = await this.findUserbyId(userID)
    if(!user) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    
    user.password = bcrypt.hashSync(newPassword, Number(process.env.BCRYPT_SALT_ROUND));

    await this.usersRepository.save(user);
    
    return true;
  }
  // End Set Password
  async findUserbyId(ID: number) {
    return await this.usersRepository.findOne({ where: {ID: ID}})
  }
  async addSensor(userID: number, sensor_id: number) {
    const user = await this.findUserbyId(userID);

    if (!user) {
      throw new NotFoundException();
    };
    if (sensor_id == 0) {
      user.sensor_id = null
    } else {
      user.sensor_id = sensor_id
    }
    

    const userEdit =  await this.usersRepository.save(user);
    return userEdit;
  }
}
