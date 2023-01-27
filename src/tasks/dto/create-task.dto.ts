import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  // decorator is absolutely necessary for each property otherwise it's not going to be extracted from the req body
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  deadline: string;

  @IsBoolean()
  isOnline: boolean;

  @IsString()
  coordinates: string;

  @IsString()
  category: string;
}
