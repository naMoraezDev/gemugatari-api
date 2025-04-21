import {
  Post,
  Body,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import {
  PostProcessingResponseDto,
  SinglePostProcessingResultDto,
  SinglePostByTopicProcessingResultDto,
} from './dtos/post-processing-response.dto';
import { ContentService } from './content.service';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiKeyAuth } from 'src/common/decorators/api-key.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenerateContentRequestDto } from './dtos/generate-content-request.dto';
import { GenerateContentsRequestDto } from './dtos/generate-contents-request.dto';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';
import { GenerateContentFromTopicRequestDto } from './dtos/generate-content-from-topic-request.dto';

@ApiTags('content')
@Controller('content')
@UseGuards(ApiKeyGuard)
@ApiKeyAuth()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('article/ai-generate/publish')
  @ApiOperation({
    summary: 'Generate AI content from a single URL',
    description:
      'Takes a URL as input, processes the content at that location using AI, and publishes the resulting generated content. Requires API key authentication.',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponseDecorator({ status: 201, type: SinglePostProcessingResultDto })
  @ApiResponse({
    description: 'Internal Server Error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async generateContent(@Body() body: GenerateContentRequestDto) {
    return this.contentService.generateContent(body.url);
  }

  @Post('bulk/ai-generate/publish')
  @ApiOperation({
    summary: 'Generate AI content from multiple URLs in bulk',
    description:
      'Extracts news article URLs from a source URL, processes a specified number of articles using AI, and publishes the resulting content. The process_limit parameter controls how many articles to process. Requires API key authentication.',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponseDecorator({ status: 201, type: PostProcessingResponseDto })
  @ApiResponse({
    description: 'Internal Server Error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async extractNewsUrls(@Body() body: GenerateContentsRequestDto) {
    return this.contentService.extractAndProcessNewsArticles(
      body.url,
      body.process_limit,
    );
  }

  @Post('topic/ai-generate/publish')
  @ApiOperation({
    summary: 'Generate AI content for a given topic',
    description:
      'Takes a topic as input and publishes the resulting generated content. Requires API key authentication.',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponseDecorator({
    status: 201,
    type: SinglePostByTopicProcessingResultDto,
  })
  @ApiResponse({
    description: 'Internal Server Error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async generateContentFromTopic(
    @Body() body: GenerateContentFromTopicRequestDto,
  ) {
    return this.contentService.generateContentFromTopic(body.topic);
  }
}
