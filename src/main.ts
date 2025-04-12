import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
  }

  await app.listen(process.env.PORT ?? 3333);
}

bootstrap();
