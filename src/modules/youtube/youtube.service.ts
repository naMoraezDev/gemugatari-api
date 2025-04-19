import {
  Logger,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  VideosParamDto,
  VideosQueryDto,
} from 'src/integrations/youtube/dtos/videos-request.dto';
import { YoutubeClient } from 'src/integrations/youtube/youtube.client';

@Injectable()
export class YoutubeService {
  private readonly logger = new Logger(YoutubeService.name);

  constructor(private readonly youtubeClient: YoutubeClient) {}

  async getLatestVideos(param: VideosParamDto, query: VideosQueryDto) {
    try {
      return await this.youtubeClient.getLatestVideos(param, query);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving youtube leatest videos: ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        `Youtube service is currently unavailable`,
      );
    }
  }

  async getChannelData(param: VideosParamDto) {
    try {
      return await this.youtubeClient.getChannelData(param);
    } catch (error) {
      this.logger.error(
        `Unexpected error while retrieving youtube channel data: ${error.message}`,
        error.stack,
      );

      throw new ServiceUnavailableException(
        `Youtube service is currently unavailable`,
      );
    }
  }
}
