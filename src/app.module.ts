import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig, appConfig, validationSchema } from './config';
import {GeneratedApiModule} from './generated'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [databaseConfig, appConfig],
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    GeneratedApiModule,
  ]
})
export class AppModule {}