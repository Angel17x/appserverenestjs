import { Module } from '@nestjs/common';
import { ConfigModules } from './config.module';
import { AuthModule } from './auth.module';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users.module';


@Module({
  imports: [ 
    ConfigModules, 
    DatabaseModule,
    AuthModule,
    UsersModule,  
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {} 
