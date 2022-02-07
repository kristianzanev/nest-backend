import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { CreateItemDto } from './dto/create-item.dto';
@Controller('items')
export class ItemsController {
  @Get()
  findAll(): string {
    return 'Got em';
  }

  @Post()
  create(@Body() item: CreateItemDto): string {
    return `Post em ${item.description} ${item.qty} ${item.name}`;
  }

  // @Post()
  // create(@Body() createCatDto: CreateCatDto) {
  //   return 'This action adds a new cat';
  // }

  // @Get()
  // findAll(@Query() query: ListAllEntities) {
  //   return `This action returns all cats (limit: ${query.limit} items)`;
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() item: CreateItemDto) {
    return `This action updates a #${id} to ${item.name}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
