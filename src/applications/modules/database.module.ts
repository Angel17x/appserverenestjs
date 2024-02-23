import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users, Binnacle } from 'src/domains/entities/entities';
import { TypeOrmProvider } from 'src/infrastructures/config/database.provider';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmProvider,
    }),
    TypeOrmModule.forFeature([Users, Binnacle]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}