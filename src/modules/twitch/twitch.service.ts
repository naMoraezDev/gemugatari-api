import {
  Logger,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { TwitchClient } from 'src/integrations/twitch/twitch.client';
import { GetTwitchUserDataParamDto } from 'src/integrations/twitch/dtos/twitch-user-request.dto';

@Injectable()
export class TwitchService {
  private readonly logger = new Logger(TwitchService.name);

  constructor(private readonly twitchClient: TwitchClient) {}

  async getTwitchUser(param: GetTwitchUserDataParamDto) {
    try {
      return await this.twitchClient.getTwitchUserData(param);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving twitch user: ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        `Twitch service is currently unavailable`,
      );
    }
  }
}
