import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { GeminiService } from 'src/integrations/gemini/gemini.service';
import { WordpressService } from 'src/integrations/wordpress/wordpress.service';

@Module({
  controllers: [ContentController],
  providers: [ContentService, WordpressService, GeminiService],
})
export class ContentModule {}
