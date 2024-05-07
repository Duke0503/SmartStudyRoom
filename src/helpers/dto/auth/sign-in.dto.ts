import { IsPhoneNumber, IsNotEmpty } from "class-validator";

export class SignInDto {
  @IsPhoneNumber()
  phone_number: string;

    @IsNotEmpty()
  password: string;
}