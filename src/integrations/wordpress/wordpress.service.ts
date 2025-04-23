import { Injectable } from '@nestjs/common';
import { PostData } from './interfaces/post-data.interface';
import { DefaultParamDto } from '../../common/dtos/default-param.dto';
import { httpClientFactory } from 'src/utils/http/http-client.factory';
import { normalizeGraphQLData } from 'src/utils/graphql/normalize-data';
import { WordPressPostResponse } from './interfaces/wp-post-response.interface';
import { GetPostsByCategoryQueryDto } from './dtos/get-posts-by-category-query.dto';

@Injectable()
export class WordpressService {
  private readonly wpTokenUrl: string;
  private readonly wpClientId: string;
  private readonly wpApiBaseUrl: string;
  private readonly wpClientSecret: string;
  private readonly wpAdminUsername: string;
  private readonly wpAdminPassword: string;

  private readonly wpBaseUrl: string;

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

    this.wpBaseUrl = process.env.WP_BASE_URL || '';
  }

  async getCategories() {
    const url = `${this.wpBaseUrl}/graphql`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            categories {
              edges {
                node {
                  count
                  id
                  name
                  slug
                  parentId
                  uri
                }
              }
            }
          }
        `,
      }),
    };

    const result = await httpClientFactory().request({
      input: url,
      init: options,
    });

    return normalizeGraphQLData(result.data);
  }

  async getCategoryBySlug(param: DefaultParamDto) {
    const url = `${this.wpBaseUrl}/graphql`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            category (id: "${param.slug}", idType: SLUG) {
              count
              id
              slug
              name
              description
              parentId
              uri
              template {
                customTemplate
                cover {
                  node {
                    altText
                    sourceUrl
                    sizes
                  }
                }
                highlights {
                  nodes {
                    id
                    slug
                  }
                }
              }
            }
          }
        `,
      }),
    };

    const result = await httpClientFactory().request({
      input: url,
      init: options,
    });

    return normalizeGraphQLData(result.data);
  }

  async getPostsByCategory(
    param: DefaultParamDto,
    query: GetPostsByCategoryQueryDto,
  ) {
    const url = `${this.wpBaseUrl}/graphql`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            posts (where: { categoryName: "${param.slug}" } ${query.first ? `first: ${query.first}` : ''} ${query.last ? `last: ${query.last}` : ''} ${query.after ? `after: "${query.after}"` : ''} ${query.before ? `before: "${query.before}"` : ''}) {
              nodes {
                id
                slug
                title
                excerpt
                date
                modified
                uri
                featuredImage {
                  node {
                    altText
                    sourceUrl
                    caption
                    sizes
                  }
                }
                categories {
                  nodes {
                    id
                    slug
                    name
                    uri
                  }
                }
                tags {
                  nodes {
                    id
                    slug
                    name
                    extraFields {
                      icon {
                        node {
                          altText
                          sourceUrl
                        }
                      }
                    }
                  }
                }
              }
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
            }
          }
        `,
      }),
    };

    const result = await httpClientFactory().request({
      input: url,
      init: options,
    });

    return {
      ...normalizeGraphQLData(result.data),
      pageInfo: result.data.posts.pageInfo,
    };
  }

  async getPostsByTag(
    param: DefaultParamDto,
    query: GetPostsByCategoryQueryDto,
  ) {
    const url = `${this.wpBaseUrl}/graphql`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            posts (where: { tag: "${param.slug}" } ${query.first ? `first: ${query.first}` : ''} ${query.last ? `last: ${query.last}` : ''} ${query.after ? `after: "${query.after}"` : ''} ${query.before ? `before: "${query.before}"` : ''}) {
              nodes {
                id
                slug
                title
                excerpt
                date
                modified
                uri
                featuredImage {
                  node {
                    altText
                    sourceUrl
                    caption
                    sizes
                  }
                }
                categories {
                  nodes {
                    id
                    slug
                    name
                    uri
                  }
                }
                tags {
                  nodes {
                    id
                    slug
                    name
                    extraFields {
                      icon {
                        node {
                          altText
                          sourceUrl
                        }
                      }
                    }
                  }
                }
              }
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
            }
          }
        `,
      }),
    };

    const result = await httpClientFactory().request({
      input: url,
      init: options,
    });

    return {
      ...normalizeGraphQLData(result.data),
      pageInfo: result.data.posts.pageInfo,
    };
  }

  async getPostBySlug(param: DefaultParamDto) {
    const url = `${this.wpBaseUrl}/graphql`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            post (id: "${param.slug}", idType: SLUG) {
              id
              slug
              featuredImage {
                node {
                  altText
                  sourceUrl
                  sizes
                  caption
                }
              }
              title
              excerpt
              date
              modified
              content
              author {
                node {
                  name
                  email
                  avatar {
                    url
                  }
                }
              }
              categories {
                nodes {
                  id
                  slug
                  name
                  uri
                }
              }
              tags {
                nodes {
                  id
                  slug
                  name
                  extraFields {
                    icon {
                      node {
                        altText
                        sourceUrl
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    };

    const result = await httpClientFactory().request({
      input: url,
      init: options,
    });

    return normalizeGraphQLData(result.data);
  }

  async getTags() {
    const url = `${this.wpBaseUrl}/graphql`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            tags {
              nodes {
                count
                id
                slug
                name
                extraFields {
                  icon {
                    node {
                      altText
                      sourceUrl
                      sizes
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    };

    const result = await httpClientFactory().request({
      input: url,
      init: options,
    });

    return normalizeGraphQLData(result.data);
  }

  async getTagBySlug(param: DefaultParamDto) {
    const url = `${this.wpBaseUrl}/graphql`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            tag (id: "${param.slug}", idType: SLUG) {
              count
              id
              slug
              name
              extraFields {
                icon {
                  node {
                    altText
                    sourceUrl
                    sizes
                  }
                }
              }
            }
          }
        `,
      }),
    };

    const result = await httpClientFactory().request({
      input: url,
      init: options,
    });

    return normalizeGraphQLData(result.data);
  }

  async createDraftPost(postData: PostData) {
    await this.ensureAuthenticated();

    postData.status = 'draft';

    const url = `${this.wpApiBaseUrl}/posts/new`;

    const formData = new URLSearchParams();

    for (const [key, value] of Object.entries(postData)) {
      if (value !== undefined) {
        formData.append(key, value.toString());
      }
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    };

    return await httpClientFactory().request<WordPressPostResponse>({
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
