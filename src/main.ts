import { NestFactory } from '@nestjs/core';
import { AppModule } from './applications/modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

// Carga las variables de entorno desde el archivo .env
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración para el ValidationPipe obtenida de las variables de entorno
  const globalPipeOptions = {
    whitelist: process.env.SERVER_GLOBALPIPE_WHITELIST === 'true',
    transform: process.env.SERVER_GLOBALPIPE_TRANSFORM === 'true',
    forbidNonWhitelisted: process.env.SERVER_GLOBALPIPE_FORBID_NON_WHITE_LISTED === 'true',
  };

  app.useGlobalPipes(new ValidationPipe(globalPipeOptions));

  const port = process.env.SERVER_PORT || 3000;
  
  await app.listen(port);
  Logger.log(`Server is running on ${port}`, 'Bootstrap');
}

bootstrap();