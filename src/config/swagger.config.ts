import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('GemuGatari API')
    .setDescription(
      'API that integrates WordPress and PandaScore services, offering unified endpoints for querying editorial content and esports data through a consistent REST interface. This integration layer centralizes access to blog posts, categories, tags, media content from WordPress alongside tournaments, matches, teams, and player statistics from PandaScore. The API implements intelligent caching mechanisms to improve performance, standardizes response formats across both platforms, and provides comprehensive documentation to streamline development workflows while reducing implementation complexity.',
    )
    .setVersion('1.0')
    /* .addBearerAuth() */
    .addApiKey(
      {
        in: 'header',
        type: 'apiKey',
        name: 'x-api-key',
        description: 'API key for authentication.',
      },
      'x-api-key',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [ApiResponseDto],
  });

  document.tags = [
    { name: 'categories' },
    { name: 'tags' },
    { name: 'posts' },
    { name: 'matches' },
    { name: 'tournaments' },
  ];

  SwaggerModule.setup('docs', app, document);
}
