import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../../common/dto/update-user.dto';
import { SignUpDto } from 'src/common/dto/sign-up.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ){}

  // Sign Up
  async signUp(signupDto: SignUpDto): Promise<User> {
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
  async updateProfile(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.findByEmail(username);

    if (!user) {
      throw new NotFoundException();
    }

    Object.assign(user, updateUserDto);

    const userEdit =  await this.usersRepository.save(user);

    delete(userEdit.password);

    return userEdit;
  }
  // End Edit Profile

  // Check Password
  async checkPassword(email: string, password: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      }
    })
    if(!user) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    if(password !== user.password) {
      return false
    }

    return true;
  }
  // End Check Password

  // Set Password
  async setPassword(email: string, newPassword: string): Promise<boolean> { 
    var user = await this.usersRepository.findOne({ 
      where: {
        email: email
      }
    });
    if(!user) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    
    user.password = newPassword;

    await this.usersRepository.save(user);
    
    return true;
  }
  // End Set Password
  async findUserbyId(ID: number) {
    return await this.usersRepository.findOne({ where: {ID: ID}})
  }
}
