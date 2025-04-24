import {
  Get,
  Req,
  Param,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import {
  CategoryDto,
  CategoriesResponseDto,
} from './dtos/categories-response.dto';
import { CategoriesService } from './categories.service';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { ApiKeyAuth } from 'src/common/decorators/api-key.decorator';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';

@ApiTags('categories')
@Controller('categories')
@UseGuards(ApiKeyGuard)
@ApiKeyAuth()
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all categories',
    description:
      'Fetches a comprehensive list of all available content categories with their details. This endpoint requires API key authentication. Results are cached in Redis for improved performance and reduced latency on subsequent requests. Use this endpoint to populate category navigation menus or filtering options in client applications.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: CategoriesResponseDto })
  @ApiResponse({
    description: 'Service Unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getCategories(@Req() request: Request) {
    const cacheKey = `categories:${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const result = await this.categoriesService.getCategories();

    await this.redisCacheService.set(cacheKey, result.categories);

    return result.categories;
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Retrieve a specific category by slug',
    description:
      'Fetches detailed information for a single content category identified by its unique slug. This endpoint requires API key authentication. Returns category metadata that can be used to display category-specific information or to provide context for related content. Returns 404 if the category does not exist. Results are cached in Redis for improved performance on subsequent requests for the same category.',
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
    const cacheKey = `category:${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const result = await this.categoriesService.getCategoryBySlug(param);

    if (!result.category) {
      throw new NotFoundException(
        `Category with slug '${param.slug}' not found`,
      );
    }

    await this.redisCacheService.set(cacheKey, result.category);

    return result.category;
  }
}
