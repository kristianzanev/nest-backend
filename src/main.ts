import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // forbidding properties in DTOs to be extracted from the body
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: true,
      enableDebugMessages: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port);
}
bootstrap();
