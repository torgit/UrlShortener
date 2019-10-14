import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, InternalServerErrorException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors();
  if (!process.env.HOST) throw new InternalServerErrorException('Required environment variable HOST')
  await app.listen(3000);
}
bootstrap();
