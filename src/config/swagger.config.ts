import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('ggatari API')
    .setDescription(
      'This Backend for Frontend (BFF) API centralizes integration with services like WordPress (via WPGraphQL), PandaScore, YouTube, and Twitch, providing a unified data layer for the frontend. User authentication is handled via Firebase Auth, while Firestore manages custom user profiles. To enhance performance, data responses are cached using Redis, reducing external API calls and improving user experience.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        in: 'header',
        name: 'Authorization',
        description: 'JWT access token for user authentication.',
      },
      'Authorization',
    )
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
    { name: 'health' },
    { name: 'categories' },
    { name: 'tags' },
    { name: 'posts' },
    { name: 'matches' },
    { name: 'tournaments' },
    { name: 'youtube' },
    { name: 'twitch' },
    { name: 'user profile' },
    { name: 'cache' },
  ];

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });
}
