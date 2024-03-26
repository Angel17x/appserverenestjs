import { Module } from '@nestjs/common';
import { UsersRepositoryImpl } from 'src/infrastructures/repositories/users.repository.impl';
import { LoginController } from 'src/applications/controllers/login.controller';
import { DatabaseModule } from './database.module';
import { LoginUseCase } from 'src/domains/usecases/login.usecase';
import { LoginServiceImpl } from '../services/login.service.impl';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthServiceImpl } from '../services/auth.service.impl';
import { JwtServiceImpl } from '../services/jwt.service.impl';

@Module({
  imports: [DatabaseModule],
  controllers: [LoginController],
  providers: [
    LoginUseCase,
    UsersRepositoryImpl,
    LoginServiceImpl,
    AuthMiddleware,
    AuthServiceImpl,
    JwtServiceImpl,
  ], // Asegúrate de incluir UsersRepositoryImpl en los providers de AuthModule
})
export class AuthModule {}
