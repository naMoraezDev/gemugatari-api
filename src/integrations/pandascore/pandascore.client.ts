import { Injectable } from '@nestjs/common';
import { GetMatchesQueryDto } from './dtos/get-matches-query.dto';
import { httpClientFactory } from 'src/utils/http/http-client.factory';

@Injectable()
export class PandascoreApiClient {
  private readonly pandascoreApiKey: string;
  private readonly pandascoreApiBaseUrl: string;

  constructor() {
    this.pandascoreApiKey = process.env.PANDASCORE_PAI_KEY || '';
    this.pandascoreApiBaseUrl = process.env.PANDASCORE_API_BASE_URL || '';
  }

  async getMatches(getMatchesQueryDto: GetMatchesQueryDto) {
    const url = `${this.pandascoreApiBaseUrl}/matches?sort=-status${getMatchesQueryDto.videogame ? `&filter[videogame]=${getMatchesQueryDto.videogame}` : '&filter[videogame]=cod-mw,cs-go,dota-2,league-of-legends,r6-siege,valorant'}${getMatchesQueryDto.limit ? `&page[size]=${getMatchesQueryDto.limit}` : ''}`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.pandascoreApiKey,
      },
    };

    return await httpClientFactory().request({
      input: url,
      init: options,
    });
  }
}
