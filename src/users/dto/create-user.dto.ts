import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPasswordValid } from './password.validator';

export class CreateUserDto {
  // decorator is absolutely necessary for each property otherwise it's not going to be extracted from the req body
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPasswordValid()
  password: string;

  @IsString()
  description: string;

  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}
