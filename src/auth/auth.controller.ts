import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/interfaces/user.interface';
import * as mongoose from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { EmailConfirmationService } from 'src/email/emailConfirmation.service';
import { EmailConfirmationGuard } from 'src/email/emailConfirmation.guard';
import { UpdateUserInfoDto } from 'src/users/dto/update-user-info.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('register')
  async create(@Body() createDto: CreateUserDto): Promise<User> {
    //TODO: throw exception error if user is already logged in
    const user = await this.usersService.create(createDto);

    await this.emailConfirmationService.sendVerificationLink(user.email);

    return user;
  }

  /**
   * @description - json with username and password should be passed in the request body from login route
   *  then the login method below is called and handled through LocalAuthGuard which is connected to
   *  the local.strategy.ts from the passport module
   * @returns jwt access token
   *
   */
  @UseGuards(EmailConfirmationGuard) // this is second
  @UseGuards(LocalAuthGuard) // this is executed first
  @Post('login')
  async login(@Request() req): Promise<{
    access_token: string;
  }> {
    // authService.validateUser is called before authService.login
    return this.authService.login(req.user);
  }

  /**
   * @description - gets user from the database if the bearer token is confirmed by JwtAuthGuard
   *  in order to get the profile route a bearer token (jwt token in this case) should be provided from the request
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): Promise<User> {
    /**  the db is called on each validation, one way to optimize it is to add
     more info about user from the jwt.strategy validate method so that instead of
     making one more call to get the user data, it can be done through the validation and passed to the req.user bellow
    */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, username, tokenVersion } = req.user;
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-profile-info')
  updateProfile(
    @Body() updateDto: UpdateUserInfoDto,
    @Request() req,
  ): Promise<User> {
    const { id } = req.user;
    return this.usersService.update(id, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout-all-devices')
  logout(@Request() req): Promise<User> {
    const { id } = req.user;
    const tokenVersion = new mongoose.Types.ObjectId().toString();

    return this.usersService.update(id, {
      tokenVersion,
    });
  }
}
