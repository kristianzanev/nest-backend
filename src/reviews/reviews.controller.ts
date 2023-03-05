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
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';
import { Review } from './interfaces/review.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateReviewDto } from './dto/update-review-info.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private reviewsService: ReviewsService,
  ) {}

  @Get()
  findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Request() req,
  ): Promise<Review> {
    const { id: creatorId } = req.user;
    const review = await this.reviewsService.create({ ...createReviewDto, creatorId });

    return review;
  }

  @Get(':id') // get request with :id should be always on bottom of other get requests
  findOne(@Param('id') id): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Request() req, @Param('id') taskId): Promise<Review> {
    const { id: creatorId } = req.user;

    return this.reviewsService.delete(creatorId, taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Request() req, @Body() updateDto: UpdateReviewDto, @Param('id') id): Promise<Review> {
    const { id: creatorId } = req.user;

    return this.reviewsService.update(creatorId, id, updateDto);
  }

  // TODO add find by review creatorId and title with guards
  // @Post('find-review-by')
  // findUserBy(@Body() findReviewDto: FindReviewByDto): Promise<Review> {
  //   return this.reviewsService.findBy(findReviewDto);
  // }
}
