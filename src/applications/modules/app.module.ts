import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModules } from './config.module';
import { AuthModule } from './auth.module';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users.module';
import { InitController } from '../controllers/init.controller';
import { LoggerMiddleware } from '../middlewares/logger.http.middleware';
import { TeachersModule } from './teachers.module';


@Module({
  imports: [ 
    ConfigModules, 
    DatabaseModule,
    AuthModule,
    UsersModule,
    TeachersModule,  
  ],
  controllers: [ InitController ],
  providers: [ ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
   .apply(LoggerMiddleware)
   .forRoutes("*");
  }
} 
