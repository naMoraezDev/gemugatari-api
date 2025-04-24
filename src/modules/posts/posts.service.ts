import {
  Logger,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { WordpressService } from 'src/integrations/wordpress/wordpress.service';
import { GetPostsBySearchQueryDto } from 'src/integrations/wordpress/dtos/get-posts-by-search-query.dto';
import { GetPostsByCategoryQueryDto } from 'src/integrations/wordpress/dtos/get-posts-by-category-query.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(private readonly wordpressService: WordpressService) {}

  async getPostsByCategory(
    param: DefaultParamDto,
    query: GetPostsByCategoryQueryDto,
  ) {
    try {
      return await this.wordpressService.getPostsByCategory(param, query);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving posts by category: ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        `Posts service is currently unavailable`,
      );
    }
  }

  async getPostsByTag(
    param: DefaultParamDto,
    query: GetPostsByCategoryQueryDto,
  ) {
    try {
      return await this.wordpressService.getPostsByTag(param, query);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving posts by tag: ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        `Posts service is currently unavailable`,
      );
    }
  }

  async getPostsBySearch(query: GetPostsBySearchQueryDto) {
    try {
      return await this.wordpressService.getPostsBySearch(query);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving posts by search: ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        `Posts service is currently unavailable`,
      );
    }
  }

  async getPostBySlug(param: DefaultParamDto) {
    try {
      return await this.wordpressService.getPostBySlug(param);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving post with slug '${param.slug}': ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        `Posts service is currently unavailable`,
      );
    }
  }
}
