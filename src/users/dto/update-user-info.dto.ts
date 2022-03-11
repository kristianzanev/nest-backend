import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserInfoDto {
  // decorator is absolutely necessary for each property otherwise it's not going to be extracted from the req body
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
