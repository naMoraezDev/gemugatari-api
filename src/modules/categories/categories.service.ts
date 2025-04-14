import {
  Logger,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
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
}
