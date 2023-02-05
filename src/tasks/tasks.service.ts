import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly model: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<Task> {
    return await this.model.findOne({ _id: id });
  }

  async findBy(param: object): Promise<Task> {
    return await this.model.findOne(param);
  }

  async create(task: Task): Promise<Task> {
    try {
      const newModel = new this.model(task);
      return await newModel.save();
    } catch (error) {
      // will throw an error if the schema doesn't match with the required parrams
      throw new BadRequestException({
        statusCode: 400,
        message: error,
        error: 'Bad Request',
      });
    }
  }

  async delete(id: string): Promise<Task> {
    return await this.model.findByIdAndRemove(id);
  }

  async update(id: string, task: Task): Promise<Task> {
    return await this.model.findByIdAndUpdate(id, task, { new: true });
  }
}
