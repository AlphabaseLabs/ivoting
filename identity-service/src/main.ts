import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { fastifyAdapter } from './fastify';
import { SwaggerApi } from './swagger.api';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  // start swagger api
  SwaggerApi.init(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
      whitelist: true,
      forbidNonWhitelisted: true,
      //TODO: make it configureable
      disableErrorMessages: false,
    }),
  );

  app.enableCors();

  await app.listen(configService.getPort(), '0.0.0.0');
}

bootstrap();
