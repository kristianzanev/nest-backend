import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/interfaces/user.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto'; // this dto should be changed with user pass dto

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('login')
  login(@Body() createUserDto: CreateUserDto): Promise<User> {
    // this dto should be changed with user pass dto
    const { email, password } = createUserDto;
    return this.service.validateUser(email, password);
  }
}
