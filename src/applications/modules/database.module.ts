import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule y ConfigService
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/domains/entities/user.entity';
import { TypeOrmProvider } from 'src/infrastructures/config/datasource.provider';

@Module({
  imports: [
    ConfigModule, // Asegúrate de importar ConfigModule aquí
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmProvider,
      imports: [ConfigModule], // Asegúrate de importar ConfigModule aquí también
      inject: [ConfigService], // Inyecta ConfigService en TypeOrmProvider
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}