import { ApiTags } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { Controller, Post, Body } from '@nestjs/common';
import { GenerateContentRequestDto } from './dtos/generate-content-request.dto';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('wordpress/generate')
  async scrapeAndRewriteNews(@Body() body: GenerateContentRequestDto) {
    return this.contentService.generateContent(body.url);
  }
}
