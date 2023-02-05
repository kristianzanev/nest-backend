import { IsNotEmpty, IsString } from 'class-validator';

export class FindTaskByDto {
  // decorator is absolutely necessary for each property otherwise it's not going to be extracted from the req body
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
