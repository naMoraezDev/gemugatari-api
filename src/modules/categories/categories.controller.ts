import { Request } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
import { Get, Req, HttpCode, Controller, HttpStatus } from '@nestjs/common';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  /* @ApiResponseDecorator({ type: MatchDto, isArray: true }) */
  @ApiResponse({
    description: 'Serviço indisponível',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getCategories(@Req() request: Request) {
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const categories = await this.categoriesService.getCategories();

    await this.redisCacheService.set(cacheKey, categories, 100);

    return categories;
  }
}
