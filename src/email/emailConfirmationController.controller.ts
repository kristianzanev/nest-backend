import {
  Controller,
  //   ClassSerializerInterceptor,
  //   UseInterceptors,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import config from 'src/config/keys';
import ConfirmEmailDto from './confirmEmail.dto';
import { EmailConfirmationService } from './emailConfirmation.service';
// import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
// import RequestWithUser from '../authentication/requestWithUser.interface';

@Controller('email-confirmation')
// @UseInterceptors(ClassSerializerInterceptor)
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly authService: AuthService,
  ) {}

  @Post('confirm')
  @UseGuards(LocalAuthGuard) // user should be logged (but not confirmed) in order to resend link
  async confirm(
    @Body() confirmationData: ConfirmEmailDto,
    @Req() request,
  ): Promise<{
    access_token: string;
  }> {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token,
    );

    await this.emailConfirmationService.confirmEmail(
      email,
      request.user.username,
    );

    const jwtOptions = {
      secret: config.jwtSecret,
      expiresIn: config.jwtUserExpiry,
    };

    return this.authService.login(request.user, jwtOptions);
  }

  @Post('resend-confirmation-link')
  @UseGuards(LocalAuthGuard) // user should be logged (but not confirmed) in order to resend link
  async resendConfirmationLink(@Req() request) {
    //TODO: add interface for the request with user - RequestWithUser
    await this.emailConfirmationService.resendConfirmationLink(request.user.id);
  }
}
