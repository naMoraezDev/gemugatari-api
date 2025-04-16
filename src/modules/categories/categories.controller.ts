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
import {
  CategoryDto,
  CategoriesResponseDto,
} from './dtos/categories-response.dto';
import { CategoriesService } from './categories.service';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all categories',
    description:
      'Fetches a list of all available categories with their details. Results are cached in Redis for improved performance.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: CategoriesResponseDto })
  @ApiResponse({
    description: 'Service Unavailable',
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
  @ApiOperation({
    summary: 'Retrieve a specific category by slug',
    description:
      'Fetches detailed information for a single category identified by its slug. Returns 404 if the category does not exist. Results are cached in Redis for improved performance.',
  })
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: CategoryDto })
  @ApiResponse({
    description: 'Not Found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Service Unavailable',
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
