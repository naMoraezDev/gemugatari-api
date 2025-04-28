import { Injectable } from '@nestjs/common';
import { DefaultParamDto } from '../../common/dtos/default-param.dto';
import { httpClientFactory } from 'src/utils/http/http-client.factory';
import { normalizeGraphQLData } from 'src/utils/graphql/normalize-data';
import { GetPostsBySearchQueryDto } from './dtos/get-posts-by-search-query.dto';
import { GetPostsByCategoryQueryDto } from './dtos/get-posts-by-category-query.dto';

@Injectable()
export class WordpressService {
  private readonly wpBaseUrl: string;

  constructor() {
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
                  id
                  slug
                  name 
                  uri
                  parentId
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

    if (!result) return null;

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
            category(id: "${param.slug}", idType: SLUG) {
              id
              slug
              name
              uri
              parentId
              description
              categoryExtraFields {
                banner {
                  node {
                    altText
                    sourceUrl
                  }
                }
                template
                headerBackground
                headerText
                highlights {
                  nodes {
                    ... on Post {
                      id
                      slug
                      uri
                      featuredImage {
                        node {
                          altText
                          sourceUrl
                        }
                      }
                      title
                      excerpt
                      categories {
                        nodes {
                          id
                          slug
                          name
                          uri
                          parentId
                        }
                      }
                      tags {
                        nodes {
                          id
                          slug
                          name
                          tagExtraFields {
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
                }
              }
              children {
                nodes {
                  id
                  slug
                  name
                  uri
                  parentId
                  categoryExtraFields {
                    banner {
                      node {
                        altText
                        sourceUrl
                      }
                    }
                  }
                  posts(first: 3) {
                    nodes {
                      id
                      slug
                      uri
                      featuredImage {
                        node {
                          altText
                          sourceUrl
                        }
                      }
                      title
                      excerpt
                      categories {
                        nodes {
                          id
                          slug
                          name
                          uri
                          parentId
                        }
                      }
                      tags {
                        nodes {
                          id
                          slug
                          name
                          tagExtraFields {
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

    if (!result) return null;

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
                uri
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
                title
                excerpt
                categories {
                  nodes {
                    id
                    slug
                    name
                    uri
                    parentId
                  }
                }
                tags {
                  nodes {
                    id
                    slug
                    name
                    tagExtraFields {
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

    if (!result) return null;

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
                uri
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
                title
                excerpt
                categories {
                  nodes {
                    id
                    slug
                    name
                    uri
                    parentId
                  }
                }
                tags {
                  nodes {
                    id
                    slug
                    name
                    tagExtraFields {
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

    if (!result) return null;

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
                uri
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
                title
                excerpt
                categories {
                  nodes {
                    id
                    slug
                    name
                    uri
                    parentId
                  }
                }
                tags {
                  nodes {
                    id
                    slug
                    name
                    tagExtraFields {
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

    if (!result) return null;

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
            post (id: "nova-temporada-do-cs2-comeca-com-o-blast-bounty-qualifier-no-dia-14-de-janeiro", idType: SLUG) {
              id
              slug
              uri
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
                  parentId
                }
              }
              tags {
                nodes {
                  id
                  slug
                  name
                  tagExtraFields {
                    icon {
                      node {
                        altText
                        sourceUrl
                      }
                    }
                  }
                }
              }
              postExtraFields {
                relatedPosts {
                  nodes {
                    ... on Post {
                      id
                      slug
                      uri
                      featuredImage {
                        node {
                          altText
                          sourceUrl
                        }
                      }
                      title
                      excerpt
                      categories {
                        nodes {
                          id
                          slug
                          name
                          uri
                          parentId
                        }
                      }
                      tags {
                        nodes {
                          id
                          slug
                          name
                          tagExtraFields {
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

    if (!result) return null;

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
                tagExtraFields {
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
        `,
      }),
    };

    const result = await httpClientFactory().request({
      input: url,
      init: options,
    });

    if (!result) return null;

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
              tagExtraFields {
                icon {
                  node {
                    altText
                    sourceUrl
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

    if (!result) return null;

    return normalizeGraphQLData(result.data);
  }
}
