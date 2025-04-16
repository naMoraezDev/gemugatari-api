import { applyDecorators } from '@nestjs/common';
import { ApiSecurity, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ApiKeyAuth = () => {
  return applyDecorators(
    ApiSecurity('x-api-key'),
    ApiUnauthorizedResponse({ description: 'Invalid or missing API key' }),
  );
};
