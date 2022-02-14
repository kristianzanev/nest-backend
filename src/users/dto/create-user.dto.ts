import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  // decorator is absolutely necessary for each property otherwise it's not going to be extracted from the req body
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  description: string;

  @IsString()
  name: string;

  @IsNotEmpty()
  username: string;
}
