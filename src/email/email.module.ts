import { Module } from '@nestjs/common';
import EmailService from './email.service';
import { EmailConfirmationService } from './emailConfirmation.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  providers: [EmailConfirmationService, EmailService],
  exports: [EmailConfirmationService],
})
export class EmailModule {}
