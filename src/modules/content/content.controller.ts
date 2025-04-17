import { ApiTags } from '@nestjs/swagger';
import { InputDto } from './dtos/input.dto';
import { ContentService } from './content.service';
import { Controller, Post, Body } from '@nestjs/common';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('wordpress/generate')
  async scrapeAndRewriteNews(@Body() body: InputDto) {
    return this.contentService.scrapeAndRewriteArticle(body.url);
  }
}
