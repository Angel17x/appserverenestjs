import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class TypeOrmProvider implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const typeOrmConfig: TypeOrmModuleOptions = {
      type: process.env.DATABASE_DIALECT as 'postgres', // Asegúrate de hacer el casting al tipo adecuado
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10), // Utiliza parseInt para convertir el string a número
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true', // Convierte el string a boolean
      autoLoadEntities: process.env.DATABASE_AUTOLOAD_ENTITIES === 'true', // Convierte el string a boolean
      logging: process.env.DATABASE_LOGGING === 'true', // Convierte el string a boolean
      entities: [join(__dirname, '../**/*.entity{.ts,.js}')], // Asegúrate de que la ruta a tus entidades sea correcta
    };

    // Si necesitas opciones de dialeto especiales, tendrás que construir el objeto de opciones aquí.
    // Por ejemplo, si DATABASE_DIALECT_OPTIONS_ENCRYPT es true, entonces podrías necesitar algo como esto:
    if (process.env.DATABASE_DIALECT === 'mssql' && process.env.DATABASE_DIALECT_OPTIONS_ENCRYPT === 'true') {
      Object.assign(typeOrmConfig, {
        extra: {
          encrypt: true,
        },
      });
    }

    return typeOrmConfig;
  }
}