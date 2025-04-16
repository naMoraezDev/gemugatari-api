import { Injectable, Logger } from '@nestjs/common';
import { PandascoreApiClient } from './pandascore.client';
import { GetMatchesQueryDto } from './dtos/get-matches-query.dto';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';

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

  async getMatch(param: DefaultParamDto) {
    try {
      return await this.pandascoreApiClient.getMatch(param);
    } catch (error) {
      this.logger.error(
        `Error retrieving match: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to retrieve match in Pandascore API');
    }
  }

  async getMatchOpponents(param: DefaultParamDto) {
    try {
      return await this.pandascoreApiClient.getMatchOpponents(param);
    } catch (error) {
      this.logger.error(
        `Error retrieving match opponents: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to retrieve match opponents in Pandascore API');
    }
  }
}
