import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  /**
   * @description -  json with username and password should be passed in the request body from login route
   *  then the login method below is called and handled through LocalAuthGuard which is connected to
   *  the local.strategy.ts from the passport module
   *
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
