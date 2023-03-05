import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  // decorator is absolutely necessary for each property otherwise it's not going to be extracted from the req body
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  deadline: string;

  @IsBoolean()
  @IsNotEmpty()
  isOnline: boolean;

  @IsString()
  @IsNotEmpty()
  coordinates: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
