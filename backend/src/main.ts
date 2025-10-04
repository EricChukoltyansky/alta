import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Location API')
    .setDescription('API for locations management')
    .setVersion('1.0')
    .build();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
