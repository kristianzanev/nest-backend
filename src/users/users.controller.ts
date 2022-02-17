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

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<User> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateUserDto): Promise<User> {
    return this.service.create(createDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<User> {
    return this.service.delete(id);
  }

  @Put(':id')
  update(@Body() updateDto: CreateUserDto, @Param('id') id): Promise<User> {
    return this.service.update(id, updateDto);
  }

  //TODO: add change-pass route
}
