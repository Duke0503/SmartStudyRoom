import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../helpers/dto/users/create-user.dto';
import { UpdateUserDto } from '../../helpers/dto/users/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(ID: number) {
    return await this.usersRepository.findOne( {
      where: {ID}
    });
  }

  async update(ID: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(ID);

    if (!user) {
      throw new NotFoundException();
    }

    Object.assign(user, updateUserDto);

    return await this.usersRepository.save(user);
  }

  async remove(ID: number) {

    const user = await this.findOne(ID);

    if (!user) {
      throw new NotFoundException();
    }
    
    return await this.usersRepository.remove(user);
  }
}
