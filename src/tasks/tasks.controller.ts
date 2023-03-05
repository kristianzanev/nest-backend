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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateTaskDto } from './dto/update-task-info.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
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
    const { id: creatorId } = req.user;
    return await this.tasksService.create({ ...createTaskDto, creatorId });
  }

  @Get(':id') // get request with :id should be always on bottom of other get requests
  findOne(@Param('id') id): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Request() req, @Param('id') taskId): Promise<Task> {
    const { id: creatorId } = req.user;

    return this.tasksService.delete(creatorId, taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Request() req, @Body() updateDto: UpdateTaskDto, @Param('id') id): Promise<Task> {
    const { id: creatorId } = req.user;

    return this.tasksService.update(creatorId, id, updateDto);
  }
  // TODO add find by task creatorId and title with guards
  // @Post('find-task-by')
  // findUserBy(@Body() findTaskDto: FindTaskByDto): Promise<Task> {
  //   return this.tasksService.findBy(findTaskDto);
  // }
}
