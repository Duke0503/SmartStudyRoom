import { IsNotEmpty, IsEmail } from "class-validator";

export class addManagedUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}