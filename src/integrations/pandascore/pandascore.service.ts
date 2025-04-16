import { Injectable, Logger } from '@nestjs/common';
import { PandascoreApiClient } from './pandascore.client';
import { GetMatchesQueryDto } from './dtos/get-matches-query.dto';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { GetTournamentsQueryDto } from './dtos/get-tournaments-query.dto';

@Injectable()
export class PandascoreService {
  private readonly logger = new Logger(PandascoreService.name);

  constructor(private readonly pandascoreApiClient: PandascoreApiClient) {}

  async getMatches(query: GetMatchesQueryDto) {
    try {
      return await this.pandascoreApiClient.getMatches(query);
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

  async getTournaments(query: GetTournamentsQueryDto) {
    try {
      return await this.pandascoreApiClient.getTournaments(query);
    } catch (error) {
      this.logger.error(
        `Error retrieving tournaments: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to retrieve tournaments in Pandascore API');
    }
  }

  async getTournament(param: DefaultParamDto) {
    try {
      return await this.pandascoreApiClient.getTournament(param);
    } catch (error) {
      this.logger.error(
        `Error retrieving tournament: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to retrieve tournament in Pandascore API');
    }
  }

  async getTournamentBrackets(param: DefaultParamDto) {
    try {
      return await this.pandascoreApiClient.getTournamentBrackets(param);
    } catch (error) {
      this.logger.error(
        `Error retrieving tournament brackets: ${error.message}`,
        error.stack,
      );
      throw new Error(
        'Failed to retrieve tournament brackets in Pandascore API',
      );
    }
  }

  async getTournamentStandings(param: DefaultParamDto) {
    try {
      return await this.pandascoreApiClient.getTournamentStandings(param);
    } catch (error) {
      this.logger.error(
        `Error retrieving tournament standings: ${error.message}`,
        error.stack,
      );
      throw new Error(
        'Failed to retrieve tournament standings in Pandascore API',
      );
    }
  }

  async getTournamentRosters(param: DefaultParamDto) {
    try {
      return await this.pandascoreApiClient.getTournamentRosters(param);
    } catch (error) {
      this.logger.error(
        `Error retrieving tournament rosters: ${error.message}`,
        error.stack,
      );
      throw new Error(
        'Failed to retrieve tournament rosters in Pandascore API',
      );
    }
  }
}
