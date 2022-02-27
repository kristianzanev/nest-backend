import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false }); // cors default value should be false (it is updated below if the config allows it)
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
  const allowedCrossOrigin = configService.get('ALLOW_CROSS_ORIGIN');

  if (allowedCrossOrigin === 'allowed') {
    console.warn('allowedCrossOrigin');
    app.enableCors(); // this is terrible for security if allowed, better solutions bellow
  }
  /** TODO: add corsWhiteList
   * Good express example below is for restricting this api usage for only certain domains.
   * It is absolutely necessary to be implemented for each request as it protects from all
   * kind of malicious sites trying to abusing this api
   */

  //   app.use((req, res, next) => {
  //     const corsWhitelist = [
  //         'https://domain1.example',
  //         'https://domain2.example',
  //         'https://domain3.example'
  //     ];
  //     if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
  //         res.header('Access-Control-Allow-Origin', req.headers.origin);
  //         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //     }

  //     next();
  // });
  // other good example - https://github.com/expressjs/cors#configuring-cors-asynchronously

  await app.listen(port);
}
bootstrap();
