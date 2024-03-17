import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`, //envFilePath: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}`: '.env',
      isGlobal: true,
    })
  ], 
  controllers: [],
  providers: [ ],
  exports: [ ConfigModule ]
})
export class ConfigModules {
    
}
