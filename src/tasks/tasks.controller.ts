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
import { UsersService } from 'src/users/users.service';
@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private usersService: UsersService,
  ) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req,
  ): Promise<Task> {
    const { id: userId } = req.user;
    const task = await this.tasksService.create({ ...createTaskDto, userId });

    await this.usersService.addTask(userId, task.id);

    return task;
  }

  @Get(':id') // get request with :id should be always on bottom of other get requests
  findOne(@Param('id') id): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Task> {
    return this.tasksService.delete(id);
  }

  @Put(':id')
  update(@Body() updateDto: CreateTaskDto, @Param('id') id): Promise<Task> {
    return this.tasksService.update(id, updateDto);
  }

  @Post('find-user-by')
  findUserBy(@Body() findTaskDto: FindTaskByDto): Promise<Task> {
    return this.tasksService.findBy(findTaskDto);
  }

  //TODO: add change-pass route
}
