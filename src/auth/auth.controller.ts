import { Controller, Post, Body } from '@nestjs/common';
import { User } from '../users/interfaces/user.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto'; // this dto should be changed with user pass dto
import { LocalStrategy } from './local.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly localStrategy: LocalStrategy) {}
  @Post('login')
  login(@Body() createUserDto: CreateUserDto): Promise<User> {
    // this dto should be changed with user pass dto
    const { email, password } = createUserDto;
    return this.localStrategy.validate(email, password);
  }
}
