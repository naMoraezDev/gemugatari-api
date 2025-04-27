import {
  Get,
  Req,
  Param,
  Query,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Request } from 'express';
import { PostsService } from './posts.service';
import { PostResponseDto } from './dtos/post-response.dto';
import { PostsResponseDto } from './dtos/posts-response.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { ApiKeyAuth } from 'src/common/decorators/api-key.decorator';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';
import { GetPostsBySearchQueryDto } from 'src/integrations/wordpress/dtos/get-posts-by-search-query.dto';
import { GetPostsByCategoryQueryDto } from 'src/integrations/wordpress/dtos/get-posts-by-category-query.dto';

@ApiTags('posts')
@Controller('posts')
@UseGuards(ApiKeyGuard)
@ApiKeyAuth()
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  @Get('category/:slug')
  @ApiOperation({
    summary: 'Retrieve posts by category',
    description:
      'Fetches a paginated list of posts belonging to a specific category identified by its slug. This endpoint requires API key authentication. The response includes post summaries suitable for listing views. Results are cached in Redis for improved performance on subsequent identical requests.',
  })
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @ApiQuery({
    type: String,
    name: 'size',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'offset',
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: PostsResponseDto })
  @ApiResponse({
    description: 'Service Unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getPostsByCategory(
    @Req() request: Request,
    @Param() param: DefaultParamDto,
    @Query() query: GetPostsByCategoryQueryDto,
  ) {
    const url = request.originalUrl || request.url;
    const queryString = url.includes('?')
      ? url.substring(url.indexOf('?'))
      : '';

    const cacheKey = `posts:category:${param.slug}${queryString ? `:${queryString}` : ''}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const result = await this.postsService.getPostsByCategory(param, query);

    await this.redisCacheService.set(cacheKey, result);

    return result;
  }

  @Get('tag/:slug')
  @ApiOperation({
    summary: 'Retrieve posts by tag',
    description:
      'Fetches a paginated list of posts associated with a specific tag identified by its slug. This endpoint requires API key authentication. The response includes post summaries suitable for tag-based content filtering. Results are cached in Redis for improved performance on subsequent identical requests.',
  })
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @ApiQuery({
    type: String,
    name: 'size',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'offset',
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: PostsResponseDto })
  @ApiResponse({
    description: 'Service Unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getPostsByTag(
    @Req() request: Request,
    @Param() param: DefaultParamDto,
    @Query() query: GetPostsByCategoryQueryDto,
  ) {
    const url = request.originalUrl || request.url;
    const queryString = url.includes('?')
      ? url.substring(url.indexOf('?'))
      : '';

    const cacheKey = `posts:tag:${param.slug}${queryString ? `:${queryString}` : ''}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const result = await this.postsService.getPostsByTag(param, query);

    await this.redisCacheService.set(cacheKey, result);

    return result;
  }

  @Get('search')
  @ApiOperation({
    summary: 'Retrieve posts by search term',
    description:
      'Fetches a paginated list of posts associated with a search term. This endpoint requires API key authentication. The response includes post summaries suitable for tag-based content filtering. Results are cached in Redis for improved performance on subsequent identical requests.',
  })
  @ApiQuery({
    type: String,
    name: 'term',
    required: true,
  })
  @ApiQuery({
    type: String,
    name: 'size',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'offset',
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: PostsResponseDto })
  @ApiResponse({
    description: 'Service Unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getPostsBySearch(
    @Req() request: Request,
    @Query() query: GetPostsBySearchQueryDto,
  ) {
    const url = request.originalUrl || request.url;
    const queryString = url.includes('?')
      ? url.substring(url.indexOf('?'))
      : '';

    const cacheKey = `posts:search:${query.term}${queryString ? `:${queryString}` : ''}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const result = await this.postsService.getPostsBySearch(query);

    await this.redisCacheService.set(cacheKey, result, 60);

    return result;
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Retrieve a specific post by slug',
    description:
      'Fetches comprehensive content and metadata for a single post identified by its unique slug. This endpoint requires API key authentication. The response includes the full post content, author information, publication date, and other related metadata. Returns 404 if the post does not exist. Results are cached in Redis for improved performance on subsequent requests for the same post.',
  })
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: PostResponseDto })
  @ApiResponse({
    description: 'Not Found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Service Unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getPostBySlug(@Param() param: DefaultParamDto) {
    const cacheKey = `posts:${param.slug}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const result = await this.postsService.getPostBySlug(param);

    if (!result.post) {
      throw new NotFoundException(`Post with slug '${param.slug}' not found`);
    }

    await this.redisCacheService.set(cacheKey, result.post);

    return result.post;
  }
}
