import { NestFactory } from '@nestjs/core';
import { AppModule } from './applications/modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { HttpErrorFilter } from './applications/middlewares/http.error-filter.middleware';

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
  app.useGlobalFilters(new HttpErrorFilter());

  const port = process.env.PORT || 80;
  
  await app.listen(port, '0.0.0.0'); 
  Logger.log(`Server is running on ${port}`, 'Bootstrap');
}

bootstrap();