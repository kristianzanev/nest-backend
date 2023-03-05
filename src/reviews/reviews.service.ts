import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './interfaces/review.interface';
import { CorePostService } from 'src/core/service/core-post.service';

@Injectable()
export class ReviewsService extends CorePostService<Review> {
  constructor(@InjectModel('Review') private readonly reviewModel: Model<Review>) {
    super(reviewModel)
  }
  // async findOne(id: string): Promise<Review> {
  //   return await this.model.findOne({ _id: id });
  // }
}
