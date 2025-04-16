import {
  Get,
  Req,
  Param,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { TagsService } from './tags.service';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
import { TagDto, TagsResponseDto } from './dtos/tags-response.dto';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { ApiKeyAuth } from 'src/common/decorators/api-key.decorator';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';

@ApiTags('tags')
@Controller('tags')
@UseGuards(ApiKeyGuard)
@ApiKeyAuth()
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all content tags',
    description:
      'Fetches a comprehensive list of all available content tags with their metadata. This endpoint requires API key authentication. Tags represent topic or content classifiers that can be used for content filtering and organization. Results are cached in Redis for improved performance and reduced server load on subsequent requests. Use this endpoint to populate tag clouds, content filtering interfaces, or related tag suggestions.',
  })
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
  @ApiOperation({
    summary: 'Retrieve a specific tag by slug',
    description:
      'Fetches detailed information for a single content tag identified by its unique slug. This endpoint requires API key authentication. The response includes the tag name, description, associated content counts, and related metadata. This data can be used for tag detail pages or to provide context when displaying tagged content. Returns 404 if the tag does not exist. Results are cached in Redis for improved performance on subsequent requests for the same tag.',
  })
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

    await this.redisCacheService.set(cacheKey, tag);

    return tag;
  }
}
