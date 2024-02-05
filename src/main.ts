import { NestFactory } from '@nestjs/core';
import { AppModule } from './applications/modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import configuration from './infrastructures/config/configuration';
import { Config } from './infrastructures/config/interfaces/config.interface';

async function bootstrap() {
  const configService:Config = configuration();
  const { port, globalpipe } = configService.server;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(globalpipe))
  await app.listen(port || 3000);
}
bootstrap();
