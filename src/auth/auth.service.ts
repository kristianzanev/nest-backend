import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // this is shared service so it is necessary to import it in the auth.module
import { User } from '../users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * @description - validates user by the passed username and pass params from req body
   * TODO: a good idea is to add validation by either userName or email
   */
  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findBy(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  /**
   * @description this method returns access token after validateUser method is called and validation is successful
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
