import {
  Logger,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { WordpressService } from 'src/integrations/wordpress/wordpress.service';

@Injectable()
export class TagsService {
  private readonly logger = new Logger(TagsService.name);

  constructor(private readonly wordpressService: WordpressService) {}

  async getTags() {
    try {
      return await this.wordpressService.getTags();
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving tags: ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        `Tags service is currently unavailable`,
      );
    }
  }

  async getTagBySlug(param: DefaultParamDto) {
    try {
      return await this.wordpressService.getTagBySlug(param);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving tag by slug: ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        `Tags service is currently unavailable`,
      );
    }
  }
}
