import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule y ConfigService
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users, Binnacle } from 'src/domains/entities/entities';
import { TypeOrmProvider } from 'src/infrastructures/config/database.provider';

@Module({
  imports: [
    ConfigModule, // Asegúrate de importar ConfigModule aquí
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmProvider,
      imports: [ConfigModule], // Asegúrate de importar ConfigModule aquí también
      inject: [ConfigService], // Inyecta ConfigService en TypeOrmProvider
    }),
    TypeOrmModule.forFeature([Users, Binnacle]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}