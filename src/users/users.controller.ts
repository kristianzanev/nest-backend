import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { FindUserByDto } from './dto/find-user-by.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('find-user-by')
  findUserBy(@Body() findUserDto: FindUserByDto): Promise<User> {
    return this.userService.findBy(findUserDto);
  }

  @Get(':id') // get request with :id should be always on bottom of other get requests
  findOne(@Param('id') id): Promise<User> {
    return this.userService.findOne(id);
  }

  // @Post() // this is handled in auth controller
  // create(@Body() createDto: CreateUserDto): Promise<User> {
  //   return this.userService.create(createDto);
  // }

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
