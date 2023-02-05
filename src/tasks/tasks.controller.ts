import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './interfaces/task.interface';
import { FindTaskByDto } from './dto/find-task-by.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
    const { id: userId } = req.user;
    // TODO add new task in the user's model tasks-list
    return this.taskService.create({ ...createTaskDto, userId });
  }

  @Get(':id') // get request with :id should be always on bottom of other get requests
  findOne(@Param('id') id): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Task> {
    return this.taskService.delete(id);
  }

  @Put(':id')
  update(@Body() updateDto: CreateTaskDto, @Param('id') id): Promise<Task> {
    return this.taskService.update(id, updateDto);
  }

  @Post('find-user-by')
  findUserBy(@Body() findTaskDto: FindTaskByDto): Promise<Task> {
    return this.taskService.findBy(findTaskDto);
  }

  //TODO: add change-pass route
}
