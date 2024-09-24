import { IsEmail, IsString } from "class-validator";

export class RegisterAuthDto {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
