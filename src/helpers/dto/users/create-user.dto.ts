import { IsEmail, IsPhoneNumber } from "class-validator";
export class CreateUserDto {

  name: string;

  @IsPhoneNumber()
  phone_number: string;

  password: string;

  @IsEmail()
  email: string;
  
  supervisor: string;

  roles: string;
}
