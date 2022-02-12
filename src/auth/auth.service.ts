import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // this is shared service so it is necessary to import it in the auth.module
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * TODO: a good idea is to add validation by either userName or email
   */
  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findBy(username);
    if (user && user.password === pass) {
      return user; // change this later
    }
    return null;
  }
}
