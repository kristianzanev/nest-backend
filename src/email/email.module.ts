import { Module } from '@nestjs/common';
import EmailService from './email.service';
import { EmailConfirmationService } from './emailConfirmation.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { EmailConfirmationController } from './emailConfirmationController.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  providers: [EmailConfirmationService, EmailService, AuthService],
  exports: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
})
export class EmailModule {}
