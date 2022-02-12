import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // this is shared service so it is necessary to import it in the auth.module

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * a good idea is to add validation by either userName or email
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findBy(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result; // change this later
    }
    return null;
  }
}
