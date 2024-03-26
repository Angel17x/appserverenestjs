import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { SubjectController } from '../controllers/subject.controller';
import { JwtServiceImpl } from '../services/jwt.service.impl';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { SubjectRepositoryImpl } from 'src/infrastructures/repositories/subject.repository.impl';
import { SubjectUseCase } from 'src/domains/usecases/subject.usecase';
import { SubjectServiceImpl } from '../services/subject.service.impl';

@Module({
  imports: [DatabaseModule],
  controllers: [SubjectController],
  providers: [
    JwtServiceImpl,
    AuthMiddleware,
    SubjectRepositoryImpl,
    SubjectUseCase,
    SubjectServiceImpl,
  ],
})
export class SubjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(SubjectController);
  }
}
