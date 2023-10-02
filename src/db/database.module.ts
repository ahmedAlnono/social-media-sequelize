import { DynamicModule, Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {
  constructor(private config: ConfigService) {}
  static register(option: string): DynamicModule {
    let envFilePath: string;
    if (option === 'development') {
      envFilePath = '.env';
    } else if (option === 'production') {
      envFilePath = '.env.production';
    } else {
      envFilePath = '.env.final';
    }
    return {
      imports: [
        ConfigModule.forRoot({
          isGlobal: false,
          envFilePath,
        }),
      ],
      module: DatabaseModule,
      providers: [...databaseProviders],
      exports: [...databaseProviders],
    };
  }
}
