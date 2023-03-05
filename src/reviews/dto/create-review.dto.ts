import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateReviewDto {
  // decorator is absolutely necessary for each property otherwise it's not going to be extracted from the req body
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  targetUserId: string;
}
