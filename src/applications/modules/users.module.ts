import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { UsersController } from 'src/applications/controllers/users.controller';
import { UsersUseCase } from 'src/domains/usecases/users.usecase';
import { UsersRepositoryImpl } from 'src/infrastructures/repositories/users.repository.impl';
import { UsersServiceImpl } from '../services/users.service.impl';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { JwtServiceImpl } from '../services/jwt.service.impl';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersUseCase, 
    UsersRepositoryImpl, 
    UsersServiceImpl, 
    AuthMiddleware, 
    JwtServiceImpl
  ], // 
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(UsersController);
  }
}
