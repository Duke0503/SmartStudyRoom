import { IsEmail, IsPhoneNumber } from 'class-validator';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateUserDto {
  name: string;
  
  supervisor: string;

  roles: string;

  @IsPhoneNumber()
  phone_number: string;

  gender: string;

  birthday: Date;
}
