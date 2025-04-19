import { Injectable } from '@nestjs/common';
import { httpClientFactory } from 'src/utils/http/http-client.factory';
import { GetTwitchUserDataParamDto } from './dtos/twitch-user-request.dto';

@Injectable()
export class TwitchClient {
  private readonly authUrl: string;
  private readonly clientId: string;
  private readonly apiBaseUrl: string;
  private readonly clientSecret: string;

  constructor() {
    this.apiBaseUrl = process.env.TWITCH_API_URL || '';
    this.clientId = process.env.TWITCH_CLIENT_ID || '';
    this.authUrl = process.env.TWITCH_AUTH_API_URL || '';
    this.clientSecret = process.env.TWITCH_CLIENT_SECRET || '';
  }

  private async authorization() {
    const url = `${this.authUrl}`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials',
      }),
    };

    const { access_token } = await httpClientFactory().request({
      input: url,
      init: options,
    });

    return access_token;
  }

  async getTwitchUserData(param: GetTwitchUserDataParamDto) {
    const token = await this.authorization();

    const url = `${this.apiBaseUrl}?login=${param.username}`;

    const options = {
      method: 'GET',
      headers: {
        'Client-Id': this.clientId,
        Authorization: `Bearer ${token}`,
      } as any,
    };

    return await httpClientFactory().request({
      input: url,
      init: options,
    });
  }
}
