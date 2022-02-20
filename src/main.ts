import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import keys from './config/keys';

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

  await app.listen(keys.port);
}
bootstrap();
