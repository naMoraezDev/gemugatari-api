import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('eCrew API')
    .setDescription('')
    .setVersion('1.0')
    /* .addBearerAuth() */
   /*  .addApiKey(
      {
        in: 'header',
        type: 'apiKey',
        name: 'x-api-key',
        description:
          'Chave de API para autenticação. Pode ser fornecida também via query param ou header Authorization',
      },
      'x-api-key',
    ) */
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [ApiResponseDto],
  });

  /* document.tags = [{ name: 'module' }]; */

  SwaggerModule.setup('docs', app, document);
}
