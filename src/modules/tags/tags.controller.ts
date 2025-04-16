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
import { TagsService } from './tags.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
import { TagDto, TagsResponseDto } from './dtos/tags-response.dto';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: TagsResponseDto })
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

    const tags = await this.tagsService.getTags();

    await this.redisCacheService.set(cacheKey, tags);

    return tags;
  }

  @Get(':slug')
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: TagDto })
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

    const tag = await this.tagsService.getTagBySlug(param);

    if (!tag) {
      throw new NotFoundException(`Tag with slug '${param.slug}' not found`);
    }

    await this.redisCacheService.set(cacheKey, tag, 100);

    return tag;
  }
}
