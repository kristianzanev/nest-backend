import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/interfaces/user.interface';

/**
 * @description This authentication strategy (passport-local) is local which means that it's custom and
 * can be modified by changing the AuthService.
 * Other strategies for authenticating can be added, like:
 * passport-facebook
 * passport-google-oauth
 * passport-twitter
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
