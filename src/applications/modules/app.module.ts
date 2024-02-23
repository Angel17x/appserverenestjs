import { Module } from '@nestjs/common';
import { ConfigModules } from './config.module';
import { AuthModule } from './auth.module';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users.module';
import { InitController } from '../controllers/init.controller';


@Module({
  imports: [ 
    ConfigModules, 
    DatabaseModule,
    AuthModule,
    UsersModule,  
  ],
  controllers: [ InitController ],
  providers: [ ],
})
export class AppModule {} 
