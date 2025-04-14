import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { RedisCacheModule } from 'src/integrations/redis/redis-cache.module';
import { WordpressService } from 'src/integrations/wordpress/wordpress.service';

@Module({
  imports: [RedisCacheModule],
  exports: [CategoriesService],
  controllers: [CategoriesController],
  providers: [CategoriesService, WordpressService],
})
export class CategoriesModule {}
