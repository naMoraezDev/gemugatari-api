import {
  Logger,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PandascoreService } from 'src/integrations/pandascore/pandascore.service';
import { GetMatchesQueryDto } from 'src/integrations/pandascore/dtos/get-matches-query.dto';

@Injectable()
export class MatchesService {
  private readonly logger = new Logger(MatchesService.name);

  constructor(private readonly pandascoreService: PandascoreService) {}

  async getMatches(getMatchesQueryDto: GetMatchesQueryDto) {
    try {
      return await this.pandascoreService.getMatches(getMatchesQueryDto);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving matches: ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        `Matches service is currently unavailable`,
      );
    }
  }
}
