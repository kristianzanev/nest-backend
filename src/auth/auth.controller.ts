import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  /**
   * @description -  json with username and password should be passed in the request body from login route
   *  then the login method below is called and handled through LocalAuthGuard which is connected to
   *  the local.strategy.ts from the passport module
   * @returns jwt access token
   *
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<{
    access_token: string;
  }> {
    // authService.validateUser is called before authService.login
    return this.authService.login(req.user);
  }

  /**
   * @description - gets user from the database if the bearer token is confirmed
   *  in order to get the profile route a bearer token (jwt token in this case) should be provided from the request
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): Promise<User> {
    const { userId } = req.user;
    return this.usersService.findOne(userId);
  }
}
