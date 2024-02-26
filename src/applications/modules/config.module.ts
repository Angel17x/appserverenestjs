import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SeedServiceImpl } from '../services/seed.service.impl';
import { UserDto } from '../dto/register-user.dto';
import { UsersUseCase } from 'src/domains/usecases/users.usecase';
import { UsersRepositoryImpl } from 'src/infrastructures/repositories/users.repository.impl';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`, //envFilePath: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}`: '.env',
      isGlobal: true,
    }),
    DatabaseModule
  ], 
  controllers: [],
  providers: [ 
    SeedServiceImpl, 
    UsersUseCase, 
    UsersRepositoryImpl ],
  exports: [ ConfigModule ]
})
export class ConfigModules implements OnModuleInit{
  constructor(private readonly seedService: SeedServiceImpl) {}
  async onModuleInit() {
    const users:UserDto[] = [
      { 
        name: process.env.USER_NAME ?? '', 
        lastname: process.env.USER_LASTNAME ?? '', 
        email: process.env.USER_EMAIL ?? '',
        password: process.env.USER_PASSWORD ?? ''
      },
      { 
        name: process.env.USER_NAME_2 ?? '', 
        lastname: process.env.USER_LASTNAME_2 ?? '', 
        email: process.env.USER_EMAIL_2 ?? '',
        password: process.env.USER_PASSWORD_2 ?? ''
      }
    ];
    const isCreate = await this.seedService.seed(users);
    Logger.log(`USERS IS CREATE? ${isCreate}`)
  }
}
