import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskInfoDto {
  // decorator is absolutely necessary for each property otherwise it's not going to be extracted from the req body
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
