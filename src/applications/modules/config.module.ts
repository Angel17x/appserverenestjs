import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/infrastructures/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot(
      { ignoreEnvFile: true, isGlobal: true, load: [ configuration ] }
    )
  ],
  controllers: [],
  providers: [],
  exports: [ ConfigModule ]
})
export class ConfigModules {}
