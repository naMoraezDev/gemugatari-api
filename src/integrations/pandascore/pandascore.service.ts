import { Injectable, Logger } from '@nestjs/common';
import { PandascoreApiClient } from './pandascore.client';
import { GetMatchesQueryDto } from './dtos/get-matches-query.dto';

@Injectable()
export class PandascoreService {
  private readonly logger = new Logger(PandascoreService.name);

  constructor(private readonly pandascoreApiClient: PandascoreApiClient) {}

  async getMatches(getMatchesQueryDto: GetMatchesQueryDto) {
    try {
      return await this.pandascoreApiClient.getMatches(getMatchesQueryDto);
    } catch (error) {
      this.logger.error(
        `Error retrieving matches: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to retrieve matches in Pandascore API');
    }
  }
}
