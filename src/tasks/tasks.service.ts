import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/task.interface';
import { CorePostService } from 'src/core/service/core-post.service';

@Injectable()
export class TasksService extends CorePostService<Task> {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {
    super(taskModel)
  }
  // async findOne(id: string): Promise<Task> {
  //   return await this.model.findOne({ _id: id });
  // }
}
