import { IsEmail, IsPhoneNumber } from 'class-validator';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateUserDto {
  name: string;
  
  supervisor: string;

  roles: string;
}
