import {
  Logger,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { PandascoreService } from 'src/integrations/pandascore/pandascore.service';
import { GetTournamentsQueryDto } from 'src/integrations/pandascore/dtos/get-tournaments-query.dto';

@Injectable()
export class TournamentsService {
  private readonly logger = new Logger(TournamentsService.name);

  constructor(private readonly pandascoreService: PandascoreService) {}

  async getTournaments(query: GetTournamentsQueryDto) {
    try {
      return await this.pandascoreService.getTournaments(query);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving tournaments: ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        'Tournaments service is currently unavailable',
      );
    }
  }

  async getTournament(param: DefaultParamDto) {
    try {
      return await this.pandascoreService.getTournament(param);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving tournament with slug '${param.slug}': ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        'Tournaments service is currently unavailable',
      );
    }
  }

  async getTournamentBrackets(param: DefaultParamDto) {
    try {
      return await this.pandascoreService.getTournamentBrackets(param);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving brackets for tournament with slug '${param.slug}': ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        'Tournaments service is currently unavailable',
      );
    }
  }

  async getTournamentStandings(param: DefaultParamDto) {
    try {
      return await this.pandascoreService.getTournamentStandings(param);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving standings for tournament with slug '${param.slug}': ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        'Tournaments service is currently unavailable',
      );
    }
  }

  async getTournamentRosters(param: DefaultParamDto) {
    try {
      return await this.pandascoreService.getTournamentRosters(param);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving rosters for tournament with slug '${param.slug}': ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        'Tournaments service is currently unavailable',
      );
    }
  }
}
