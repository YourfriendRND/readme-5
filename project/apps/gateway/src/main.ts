/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { RequestIdInterceptor } from './app/interceptors/request-id.interceptor';
import { GLOBAL_ROUTE_PREFIX } from '@project/shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_ROUTE_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new RequestIdInterceptor());

  const port = process.env.PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_ROUTE_PREFIX}`
  );
}

bootstrap();
