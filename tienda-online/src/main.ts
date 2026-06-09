import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Documentación Swagger / Scalar
  const config = new DocumentBuilder()
    .setTitle('Tienda Online API')
    .setDescription('API REST — TAW-251 | NestJS + TypeORM + PostgreSQL')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger UI en /api  (requerido por la práctica 2)
  SwaggerModule.setup('api', app, document);

  // Scalar en /scalar
  try {
    const { ApiReference } = await import('@scalar/nestjs-api-reference');
    app.use('/scalar', ApiReference({ spec: { content: document } }));
  } catch {
    console.log('Scalar no disponible — usa Swagger en /api');
  }

  // ⚠️  Render requiere: escuchar en 0.0.0.0 y leer PORT del entorno
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`\n🚀  API:     http://localhost:${port}`);
  console.log(`📖  Swagger: http://localhost:${port}/api`);
  console.log(`🎨  Scalar:  http://localhost:${port}/scalar\n`);
}
bootstrap();
