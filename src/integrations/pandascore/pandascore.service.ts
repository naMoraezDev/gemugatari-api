import { Injectable, Logger } from '@nestjs/common';
import { PandascoreApiClient } from './pandascore.client';
import { GetMatchParamsDto } from './dtos/get-match-params.dto';
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

  async getMatch(getMatchParamsDto: GetMatchParamsDto) {
    try {
      return await this.pandascoreApiClient.getMatch(getMatchParamsDto);
    } catch (error) {
      this.logger.error(
        `Error retrieving match: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to retrieve match in Pandascore API');
    }
  }
}
