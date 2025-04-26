import { Injectable } from '@nestjs/common';
import { PostData } from './interfaces/post-data.interface';
import { DefaultParamDto } from '../../common/dtos/default-param.dto';
import { httpClientFactory } from 'src/utils/http/http-client.factory';
import { normalizeGraphQLData } from 'src/utils/graphql/normalize-data';
import { WordPressPostResponse } from './interfaces/wp-post-response.interface';
import { GetPostsBySearchQueryDto } from './dtos/get-posts-by-search-query.dto';
import { GetPostsByCategoryQueryDto } from './dtos/get-posts-by-category-query.dto';

@Injectable()
export class WordpressService {
  private readonly wpBaseUrl: string;
  private readonly wpAdminUsername: string;
  private readonly wpAdminPassword: string;

  constructor() {
    this.wpBaseUrl = process.env.WP_BASE_URL || '';
    this.wpAdminUsername = process.env.WP_ADMIN_USERNAME || '';
    this.wpAdminPassword = process.env.WP_ADMIN_PASSWORD || '';
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
            posts (where: { categoryName: "${param.slug}", offsetPagination: { size: ${query.size || 10}, offset: ${query.offset || 0} } }) {
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
                  offsetPagination {
                  hasMore
                  hasPrevious
                  total
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

    return {
      pageInfo: result.data.posts.pageInfo,
      ...normalizeGraphQLData(result.data),
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
            posts (where: { tag: "${param.slug}", offsetPagination: { size: ${query.size || 10}, offset: ${query.offset || 0} } }) {
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
                offsetPagination {
                  hasMore
                  hasPrevious
                  total
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

    return {
      pageInfo: result.data.posts.pageInfo,
      ...normalizeGraphQLData(result.data),
    };
  }

  async getPostsBySearch(query: GetPostsBySearchQueryDto) {
    const url = `${this.wpBaseUrl}/graphql`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            posts (where: { search: "${query.term}", offsetPagination: { size: ${query.size || 10}, offset: ${query.offset || 0} } }) {
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
                offsetPagination {
                  hasMore
                  hasPrevious
                  total
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

    return {
      pageInfo: result.data.posts.pageInfo,
      ...normalizeGraphQLData(result.data),
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
    const auth = btoa(`${this.wpAdminUsername}:${this.wpAdminPassword}`);

    postData.status = 'draft';

    const url = `${this.wpBaseUrl}/wp-json/wp/v2/posts`;

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };

    return await httpClientFactory().request<WordPressPostResponse>({
      input: url,
      init: options,
    });
  }
}
