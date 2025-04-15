import {
  Get,
  Req,
  Param,
  HttpCode,
  Controller,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { CategoriesService } from './categories.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
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

    await this.redisCacheService.set(cacheKey, categories);

    return categories;
  }

  @Get(':slug')
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  /* @ApiResponseDecorator({ type: MatchDto, isArray: true }) */
  @ApiResponse({
    description: 'Serviço indisponível',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getCategoryBySlug(
    @Req() request: Request,
    @Param() param: DefaultParamDto,
  ) {
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const category = await this.categoriesService.getCategoryBySlug(param);

    if (!category) {
      throw new NotFoundException(
        `Category with slug '${param.slug}' not found`,
      );
    }

    await this.redisCacheService.set(cacheKey, category);

    return category;
  }
}
