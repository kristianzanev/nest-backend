import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

  @Get(':id') // get request with :id should be always on bottom of other get requests
  findOne(@Param('id') id): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('find-user-by')
  findUserBy(@Body() findUserDto: FindUserByDto): Promise<User> {
    return this.userService.findBy(findUserDto);
  }

  // @Delete(':id') // this should be handled only in auth or from admin role
  // delete(@Param('id') id): Promise<User> {
  //   return this.userService.delete(id);
  // }

  // @Put(':id') // this is handled in auth controller
  // update(@Body() updateDto: UpdateUserInfoDto, @Param('id') id): Promise<User> {
  // return this.userService.update(id, updateDto);
  // }

  // @Post() // this is handled in auth controller
  // create(@Body() createDto: CreateUserDto): Promise<User> {
  //   return this.userService.create(createDto);
  // }

  //TODO: add change-pass route
}
