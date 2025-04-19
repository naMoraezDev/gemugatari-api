import { Injectable } from '@nestjs/common';
import { GetMatchesQueryDto } from './dtos/get-matches-query.dto';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { httpClientFactory } from 'src/utils/http/http-client.factory';
import { GetTournamentsQueryDto } from './dtos/get-tournaments-query.dto';

@Injectable()
export class PandascoreApiClient {
  private readonly pandascoreApiKey: string;
  private readonly pandascoreApiBaseUrl: string;

  constructor() {
    this.pandascoreApiKey = process.env.PANDASCORE_API_KEY || '';
    this.pandascoreApiBaseUrl = process.env.PANDASCORE_API_BASE_URL || '';
  }

  async getMatches(query: GetMatchesQueryDto) {
    const url = `${this.pandascoreApiBaseUrl}/matches?sort=-status${query.videogame ? `&filter[videogame]=${query.videogame}` : '&filter[videogame]=cod-mw,cs-go,dota-2,league-of-legends,r6-siege,valorant'}${query.limit ? `&page[size]=${query.limit}` : ''}`;

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

  async getMatch(param: DefaultParamDto) {
    const url = `${this.pandascoreApiBaseUrl}/matches/${param.slug}`;

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

  async getMatchOpponents(param: DefaultParamDto) {
    const url = `${this.pandascoreApiBaseUrl}/matches/${param.slug}/opponents`;

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

  async getTournaments(query: GetTournamentsQueryDto) {
    const url = `${this.pandascoreApiBaseUrl}${query.videogame ? `/${query.videogame}` : ''}/tournaments?page[size]=${query.limit ? query.limit : '10'}`;

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

  async getTournament(param: DefaultParamDto) {
    const url = `${this.pandascoreApiBaseUrl}/tournaments/${param.slug}`;

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

  async getTournamentBrackets(param: DefaultParamDto) {
    const url = `${this.pandascoreApiBaseUrl}/tournaments/${param.slug}/brackets`;

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

  async getTournamentStandings(param: DefaultParamDto) {
    const url = `${this.pandascoreApiBaseUrl}/tournaments/${param.slug}/standings`;

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

  async getTournamentRosters(param: DefaultParamDto) {
    const url = `${this.pandascoreApiBaseUrl}/tournaments/${param.slug}/rosters`;

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
