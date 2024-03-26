import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { StudentRepositoryImpl } from 'src/infrastructures/repositories/student.repository.impl';
import { StudentServiceImpl } from '../services/student.service.impl';
import { StudentUseCase } from 'src/domains/usecases/students.usecase';
import { JwtServiceImpl } from '../services/jwt.service.impl';
import { StudentController } from '../controllers/student.controller';
import { UsersRepositoryImpl } from 'src/infrastructures/repositories/users.repository.impl';
import { TeacherRepositoryImpl } from 'src/infrastructures/repositories/teacher.repository.impl';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentController],
  providers: [
    AuthMiddleware,
    JwtServiceImpl,
    StudentRepositoryImpl,
    UsersRepositoryImpl,
    StudentServiceImpl,
    TeacherRepositoryImpl,
    StudentUseCase,
  ],
})
export class StudentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(StudentController);
  }
}
