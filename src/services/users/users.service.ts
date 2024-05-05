import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../helpers/dto/users/create-user.dto';
import { UpdateUserDto } from '../../helpers/dto/users/update-user.dto';
import { SignUpDto } from 'src/helpers/dto/auth/sign-up.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){}

  // Sign Up
  async signUp(signupDto: SignUpDto) {
    const user = this.usersRepository.create(signupDto);

    return await this.usersRepository.save(user);
  }
  // End Sign Up

  // Log In
  async findByPhone(phone_number: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: {
        phone_number: phone_number,
      }
    })
  }
  // End Log In

  // Edit Profile
  async updateProfile(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.findByPhone(username);

    if (!user) {
      throw new NotFoundException();
    }

    Object.assign(user, updateUserDto);

    return await this.usersRepository.save(user);
  }
  // End Edit Profile
}
