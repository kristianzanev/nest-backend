import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import config from '../config/keys';
import { UsersService } from '../users/users.service'; // this is shared service so it is necessary to import it in the auth.module

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(payload: any) {
    const { id, username, tokenVersion } = payload;
    const user = await this.usersService.findOne(id); // not the best strategy because the db is called on each validation

    if (user?.tokenVersion !== tokenVersion) {
      throw new UnauthorizedException();
    }

    return {
      id,
      username,
      tokenVersion,
    };
  }
}
