import { Injectable } from '@nestjs/common';
import { httpClientFactory } from 'src/utils/http/http-client.factory';
import { VideosParamDto, VideosQueryDto } from './dtos/videos-request.dto';

@Injectable()
export class YoutubeClient {
  private readonly googleApiKey: string;
  private readonly googleApiBaseUrl: string;

  constructor() {
    this.googleApiKey = process.env.GOOGLE_API_KEY || '';
    this.googleApiBaseUrl = process.env.GOOGLE_API_BASE_URL || '';
  }

  async getLatestVideos(param: VideosParamDto, query: VideosQueryDto) {
    const url = `${this.googleApiBaseUrl}/youtube/v3/search?key=${this.googleApiKey}&channelId=${param.id}&part=snippet,id&order=date${query.limit ? `&maxResults=${query.limit}` : ''}`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return await httpClientFactory().request({
      input: url,
      init: options,
    });
  }

  async getChannelData(param: VideosParamDto) {
    const url = `${this.googleApiBaseUrl}/youtube/v3/channels?part=snippet&id=${param.id}&fields=items&key=${this.googleApiKey}`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return await httpClientFactory().request({
      input: url,
      init: options,
    });
  }
}
