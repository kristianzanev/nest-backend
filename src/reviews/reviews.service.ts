import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './interfaces/review.interface';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel('Review') private readonly model: Model<Review>) {}

  async findAll(): Promise<Review[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<Review> {
    return await this.model.findOne({ _id: id });
  }

  async findBy(param: object): Promise<Review> {
    return await this.model.findOne(param);
  }

  async create(review: Review): Promise<Review> {
    try {
      const newModel = new this.model(review);
      return await newModel.save();
    } catch (error) {
      //will throw an error if the schema doesn't match with the required parrams
      throw new BadRequestException({
        statusCode: 400,
        message: error,
        error: 'Bad Request',
      });
    }
  }

  async delete(id: string): Promise<Review> {
    return await this.model.findByIdAndRemove(id);
  }

  async update(id: string, review: Review): Promise<Review> {
    return await this.model.findByIdAndUpdate(id, review, { new: true });
  }
}
