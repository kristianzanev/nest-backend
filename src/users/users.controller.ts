import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import EmailService from 'src/email/email.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('register')
  register() {
    // sending GET req to register route will not work here because it's already in use
    // @Query('token') token: number // for getting params from url, example: http://localhost:3000/users?token=123456
    const dummyMailOptions = {
      from: '"zadachki.bg " <tasker-bot@outlook.com>', // sender address (who sends)
      to: 'kristianzanev@hotmail.com', // can also be list of receivers (just put comma between emails)
      subject: 'Hello ', // Subject line
      text: 'Hello world ', // plaintext body
      html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js', // html body
    };
    return this.emailService.sendMail(dummyMailOptions);
  }

  @Post()
  create(@Body() createDto: CreateUserDto): Promise<User> {
    return this.userService.create(createDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<User> {
    return this.userService.delete(id);
  }

  @Put(':id')
  update(@Body() updateDto: CreateUserDto, @Param('id') id): Promise<User> {
    //TODO: add UpdateUserDto excluding sensitive data like password, tokenVersion and etc
    return this.userService.update(id, updateDto);
  }

  //TODO: add change-pass route
}
