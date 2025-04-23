export function normalizeGraphQLData<T>(data: T): any {
  if (data === null || data === undefined || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => normalizeGraphQLData(item));
  }

  const obj = data as Record<string, any>;

  if (obj.uri && typeof obj.uri === 'string') {
    let cleanedUri = obj.uri.replace(/\/category\//g, '/');
    cleanedUri = cleanedUri.replace(/\/\//g, '/');
    if (cleanedUri.length > 1 && cleanedUri.endsWith('/')) {
      cleanedUri = cleanedUri.slice(0, -1);
    }
    if (!cleanedUri.startsWith('/') && cleanedUri !== '') {
      cleanedUri = '/' + cleanedUri;
    }
    obj.uri = cleanedUri;
  }

  if (obj.edges && Array.isArray(obj.edges)) {
    return obj.edges.map((edge) => normalizeGraphQLData(edge.node));
  }

  if (obj.nodes && Array.isArray(obj.nodes)) {
    return obj.nodes.map((node) => normalizeGraphQLData(node));
  }

  if ('node' in obj && typeof obj.node === 'object') {
    return normalizeGraphQLData(obj.node);
  }

  const result: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = normalizeGraphQLData(obj[key]);
    }
  }

  return result;
}
