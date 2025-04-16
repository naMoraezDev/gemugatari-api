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
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { ApiKeyAuth } from 'src/common/decorators/api-key.decorator';
import { PostDto, PostsResponseDto } from './dtos/posts-response.dto';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';
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
      'Fetches a paginated list of posts belonging to a specific category identified by its slug. Results are cached in Redis for improved performance. Optional pagination parameters can be provided.',
  })
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @ApiQuery({
    type: String,
    name: 'page',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'limit',
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
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const posts = await this.postsService.getPostsByCategory(param, query);

    await this.redisCacheService.set(cacheKey, posts);

    return posts;
  }

  @Get('tag/:slug')
  @ApiOperation({
    summary: 'Retrieve posts by tag',
    description:
      'Fetches a paginated list of posts associated with a specific tag identified by its slug. Results are cached in Redis for improved performance. Optional pagination parameters can be provided.',
  })
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @ApiQuery({
    type: String,
    name: 'page',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'limit',
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
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const posts = await this.postsService.getPostsByTag(param, query);

    await this.redisCacheService.set(cacheKey, posts);

    return posts;
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Retrieve a specific post by slug',
    description:
      'Fetches detailed information for a single post identified by its slug. Returns 404 if the post does not exist. Results are cached in Redis for improved performance.',
  })
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: PostDto })
  @ApiResponse({
    description: 'Not Found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Service Unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getPostBySlug(
    @Req() request: Request,
    @Param() param: DefaultParamDto,
  ) {
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const post = await this.postsService.getPostBySlug(param);

    if (!post) {
      throw new NotFoundException(`Post with slug '${param.slug}' not found`);
    }

    await this.redisCacheService.set(cacheKey, post);

    return post;
  }
}
