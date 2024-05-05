import { IsPhoneNumber, IsNotEmpty } from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber()
  phone_number: string;

  @IsNotEmpty()
  password: string;
}