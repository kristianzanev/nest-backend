import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly model: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.model.findOne({ _id: id });
  }

  async findBy(username: string): Promise<User> {
    return await this.model.findOne({ username });
  }

  async create(user: User): Promise<User> {
    try {
      const newModel = new this.model(user);
      return await newModel.save();
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: error,
        error: 'Bad Request',
      });
    }
  }

  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndRemove(id);
  }

  async update(id: string, user: User): Promise<User> {
    return await this.model.findByIdAndUpdate(id, user, { new: true });
  }
}
