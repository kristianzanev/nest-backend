import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { FindUserByDto } from './dto/find-user-by.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Architect)
  @Delete(':id')
  delete(@Param('id') id): any {
    return this.userService.delete(id);
  }

  // @Post() // this is handled in auth controller
  // create(@Body() createDto: CreateUserDto): Promise<User> {
  //   return this.userService.create(createDto);
  // }

  //TODO: add change-pass route
}
