import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Get configuration
  const port = configService.get<number>('app.port') || 3000;
  const apiPrefix = configService.get<string>('app.apiPrefix') || 'api';
  const nodeEnv = configService.get<string>('app.nodeEnv') || 'development';

  // Set global prefix
  app.setGlobalPrefix(apiPrefix);

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger configuration (only in development)
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('OmniStore POS API')
      .setDescription('Backend API for OmniStore Grocery Management System')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${apiPrefix}/docs`, app, document);
    
    console.log(`📚 Swagger UI: http://localhost:${port}/${apiPrefix}/docs`);
  }

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/${apiPrefix}`);
  console.log(`🌍 Environment: ${nodeEnv}`);
}
bootstrap();
