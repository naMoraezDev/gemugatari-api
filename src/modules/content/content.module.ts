import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { GeminiService } from 'src/integrations/gemini/gemini.service';

@Module({
  controllers: [ContentController],
  providers: [ContentService, GeminiService],
})
export class ContentModule {}
