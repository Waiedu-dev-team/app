import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('WAIEDU Backend API')
    .setDescription('API documentation for WAIEDU Backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Enable CORS
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  const port = process.env.PORT ?? 3000;
  const host = '0.0.0.0'; // Listen on all network interfaces
  
  await app.listen(port, host);
  
  console.log(`🚀 Application is running on: http://${host}:${port}`);
  console.log(`🌐 Server accessible from any IP on port ${port}`);
  console.log(`📚 Swagger API docs available at: http://localhost:${port}/api-docs`);
  console.log(`🔧 To access from another machine, use: http://YOUR_MACHINE_IP:${port}`);
}
bootstrap();
