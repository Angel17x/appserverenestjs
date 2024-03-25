import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { JwtServiceImpl } from '../services/jwt.service.impl';
import { TeacherServiceImpl } from '../services/teacher.service.impl';
import { TeacherUseCase } from '../../domains/usecases/teacher.usecase';
import { UsersRepositoryImpl } from 'src/infrastructures/repositories/users.repository.impl';
import { TeacherRepositoryImpl } from 'src/infrastructures/repositories/teacher.repository.impl';
import { TeacherRepository } from 'src/domains/repositories/teacher.repository';
import { TeachersController } from '../controllers/teachers.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TeachersController],
  providers: [
    JwtServiceImpl,
    TeacherRepositoryImpl,
    TeacherServiceImpl,
    TeacherUseCase,
    UsersRepositoryImpl
  ],
})
export class TeachersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(TeachersController);
  }
}
