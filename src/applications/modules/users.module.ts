import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { UsersController } from 'src/applications/controllers/users.controller';
import { UsersUseCase } from 'src/domains/usecases/users.usecase';
import { UsersRepositoryImpl } from 'src/infrastructures/repositories/users.repository.impl';
import { UsersServiceImpl } from '../services/users.service.impl';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { JwtServiceImpl } from '../services/jwt.service.impl';
import { UserDto } from '../dto/register-user.dto';
import { SeedServiceImpl } from '../services/seed.service.impl';
import { Role } from '../enums/role.enum';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersUseCase,
    UsersRepositoryImpl,
    UsersServiceImpl,
    SeedServiceImpl,
    AuthMiddleware,
    JwtServiceImpl,
  ], //
})
export class UsersModule implements NestModule, OnModuleInit {
  constructor(private readonly seedService: SeedServiceImpl) {}
  async onModuleInit() {
    const users: UserDto[] = [
      {
        name: process.env.USER_NAME ?? '',
        lastname: process.env.USER_LASTNAME ?? '',
        email: process.env.USER_EMAIL ?? '',
        password: process.env.USER_PASSWORD ?? '',
        role: Role[process.env.USER_ROLE] ?? Role.PEOPLE,
      },
      {
        name: process.env.USER_NAME_2 ?? '',
        lastname: process.env.USER_LASTNAME_2 ?? '',
        email: process.env.USER_EMAIL_2 ?? '',
        password: process.env.USER_PASSWORD_2 ?? '',
        role: Role[process.env.USER_ROLE_2] ?? Role.PEOPLE,
      },
    ];
    const isCreate = await this.seedService.seed(users);
    Logger.log(`USERS IS CREATE? ${isCreate}`);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UsersController);
  }
}
