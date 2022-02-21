import { IsString, IsNotEmpty, IsJWT } from 'class-validator';

export class ConfirmEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  token: string;
}

export default ConfirmEmailDto;
