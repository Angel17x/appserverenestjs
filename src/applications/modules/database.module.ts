import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student, User, Binnacle, Teacher } from 'src/domains/entities/entities';
import { TypeOrmProvider } from 'src/infrastructures/config/database.provider';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmProvider,
    }),
    TypeOrmModule.forFeature([User, Binnacle, Teacher, Student]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}