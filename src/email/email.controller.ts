import {
  Controller,
  //   ClassSerializerInterceptor,
  //   UseInterceptors,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import ConfirmEmailDto from './confirmEmail.dto';
import { EmailConfirmationService } from './emailConfirmation.service';
// import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
// import RequestWithUser from '../authentication/requestWithUser.interface';

@Controller('email-confirmation')
// @UseInterceptors(ClassSerializerInterceptor)
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.emailConfirmationService.confirmEmail(email);
  }

  @Post('resend-confirmation-link')
  @UseGuards(JwtAuthGuard) // user should be logged (but not confirmed) in order to resend link
  async resendConfirmationLink(@Req() request) {
    //TODO: add interface for the request with user - RequestWithUser
    await this.emailConfirmationService.resendConfirmationLink(request.user.id);
  }
}
