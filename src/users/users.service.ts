import { Injectable } from '@nestjs/common';
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

  /**
   * not the best way of doing this
   */
  async findBy(email: string): Promise<User> {
    return await this.model.findOne({ email });
  }

  async create(user: User): Promise<User> {
    const newModel = new this.model(user);
    return await newModel.save();
  }

  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndRemove(id);
  }

  async update(id: string, user: User): Promise<User> {
    return await this.model.findByIdAndUpdate(id, user, { new: true });
  }
}
