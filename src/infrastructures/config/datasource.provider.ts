import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './interfaces/config.interface';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class TypeOrmProvider implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const databaseConfig = this.configService.get<DatabaseConfig>('database'); // Asegúrate de que 'database' sea la clave correcta en tu archivo de configuración
    const typeOrmConfig: TypeOrmModuleOptions = {
      type: databaseConfig.dialect, // Cambia el tipo a 'mssql' para SQL Server
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password, 
      database: databaseConfig.database,
      synchronize: databaseConfig.synchronize,
      autoLoadEntities: databaseConfig.autoLoadEntities,
      logging: databaseConfig.logging,
      entities: [join(__dirname, '../**/*.entity{.ts,.js}')], // Agrega aquí tus entidades de TypeORM
    };

    return typeOrmConfig;
  }
}