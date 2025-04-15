import {
  Logger,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { WordpressService } from 'src/integrations/wordpress/wordpress.service';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(private readonly wordpressService: WordpressService) {}

  async getCategories() {
    try {
      return await this.wordpressService.getCategories();
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving categories: ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        `Categories service is currently unavailable`,
      );
    }
  }

  async getCategoryBySlug(param: DefaultParamDto) {
    try {
      return await this.wordpressService.getCategoryBySlug(param);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving category by slug: ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        `Categories service is currently unavailable`,
      );
    }
  }
}
