import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { hashString } from 'src/utils/pass.bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly model: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.model.findOne({ _id: id });
  }

  async findBy(param: object): Promise<User> {
    return await this.model.findOne(param);
  }

  async create(user: User): Promise<User> {
    try {
      const hashedPass = await hashString(user.password);
      const newModel = new this.model({ ...user, password: hashedPass });
      return await newModel.save();
    } catch (error) {
      // will throw an error if username or email are already present in the db
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

  async markEmailAsConfirmed(userId: string): Promise<User> {
    return await this.model.findByIdAndUpdate(
      userId,
      {
        isEmailConfirmed: true,
      },
      { new: true },
    );
  }
}
