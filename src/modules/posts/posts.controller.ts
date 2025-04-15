import {
  Get,
  Req,
  Param,
  Query,
  HttpCode,
  Controller,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PostsService } from './posts.service';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';
import { GetPostsByCategoryQueryDto } from 'src/integrations/wordpress/dtos/get-posts-by-category-query.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  @Get('category/:slug')
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
  /* @ApiResponseDecorator({ type: MatchDto, isArray: true }) */
  @ApiResponse({
    description: 'Serviço indisponível',
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
  /* @ApiResponseDecorator({ type: MatchDto, isArray: true }) */
  @ApiResponse({
    description: 'Serviço indisponível',
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
