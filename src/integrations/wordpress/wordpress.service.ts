import { Injectable } from '@nestjs/common';
import { DefaultParamDto } from '../../common/dtos/default-param.dto';
import { httpClientFactory } from 'src/utils/http/http-client.factory';
import { GetPostsByCategoryQueryDto } from './dtos/get-posts-by-category-query.dto';

@Injectable()
export class WordpressService {
  private readonly wpTokenUrl: string;
  private readonly wpClientId: string;
  private readonly wpApiBaseUrl: string;
  private readonly wpClientSecret: string;
  private readonly wpAdminUsername: string;
  private readonly wpAdminPassword: string;

  private tokenExpiry: Date | null = null;
  private isAuthenticated: boolean = false;
  private accessToken: string | null = null;
  private authInProgress: Promise<void> | null = null;

  constructor() {
    this.wpTokenUrl = process.env.WP_TOKEN_URL || '';
    this.wpClientId = process.env.WP_CLIENT_ID || '';
    this.wpApiBaseUrl = process.env.WP_API_BASE_URL || '';
    this.wpClientSecret = process.env.WP_CLIENT_SECRET || '';
    this.wpAdminUsername = process.env.WP_ADMIN_USERNAME || '';
    this.wpAdminPassword = process.env.WP_ADMIN_PASSWORD || '';
  }

  async getCategories() {
    const url = `${this.wpApiBaseUrl}/categories`;

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

  async getCategoryBySlug(param: DefaultParamDto) {
    const url = `${this.wpApiBaseUrl}/categories/slug:${param.slug}`;

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

  async getPostsByCategory(
    param: DefaultParamDto,
    query: GetPostsByCategoryQueryDto,
  ) {
    const url = `${this.wpApiBaseUrl}/posts?category=${param.slug}${query.page ? `&page=${query.page}` : ''}${query.limit ? `&number=${query.limit}` : ''}`;

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

  async getPostsByTag(
    param: DefaultParamDto,
    query: GetPostsByCategoryQueryDto,
  ) {
    const url = `${this.wpApiBaseUrl}/posts?tag=${param.slug}${query.page ? `&page=${query.page}` : ''}${query.limit ? `&number=${query.limit}` : ''}`;

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

  async getPostBySlug(param: DefaultParamDto) {
    const url = `${this.wpApiBaseUrl}/posts/slug:${param.slug}`;

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

  async getTags() {
    const url = `${this.wpApiBaseUrl}/tags`;

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

  async getTagBySlug(param: DefaultParamDto) {
    const url = `${this.wpApiBaseUrl}/tags/slug:${param.slug}`;

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

  async authenticate(): Promise<void> {
    if (this.authInProgress) {
      await this.authInProgress;
      return;
    }

    if (
      this.tokenExpiry &&
      this.isAuthenticated &&
      new Date() < this.tokenExpiry
    ) {
      return;
    }

    this.authInProgress = this.executeAuthentication();
    await this.authInProgress;
    this.authInProgress = null;
  }

  private async executeAuthentication(): Promise<void> {
    const clientId = this.wpClientId;
    const username = this.wpAdminUsername;
    const password = this.wpAdminPassword;
    const clientSecret = this.wpClientSecret;

    try {
      const formData = new URLSearchParams();

      formData.append('username', username);
      formData.append('password', password);
      formData.append('client_id', clientId);
      formData.append('grant_type', 'password');
      formData.append('client_secret', clientSecret);

      const url = this.wpTokenUrl;

      const options = {
        method: 'POST',
        body: formData.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      const data = await httpClientFactory().request({
        input: url,
        init: options,
      });

      this.accessToken = data.access_token;
      const expiresIn = data.expires_in || 7200;
      this.tokenExpiry = new Date(Date.now() + expiresIn * 1000);
      this.isAuthenticated = true;

      console.log('WordPress.com: Authentication successful');

      this.setupTokenRenewal(expiresIn);
    } catch (error) {
      console.error(
        'WordPress.com: Error in automatic authentication:',
        error.message,
      );
      this.isAuthenticated = false;
      throw new Error('Automatic authentication failed with WordPress.com');
    }
  }

  private setupTokenRenewal(expiresIn: number): void {
    const renewalTime = expiresIn * 1000 - 10 * 60 * 1000;

    setTimeout(async () => {
      console.log('Starting proactive renewal of WordPress.com token');
      try {
        await this.authenticate();
      } catch (error) {
        console.error('Proactive token renewal failed:', error);
      }
    }, renewalTime);
  }

  private async ensureAuthenticated(): Promise<void> {
    if (
      !this.isAuthenticated ||
      (this.tokenExpiry && new Date() > this.tokenExpiry)
    ) {
      await this.authenticate();
    }
  }
}
