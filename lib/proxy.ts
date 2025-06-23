import { cache } from './cache';

// Google Apps Script URL from environment variable or fallback to hardcoded
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzX-dmnDRM19r8DsptquCTLsA3jz7dJVb0QzPqFiB02ZK6SKpZdzjUMpj0JJ4iBuFoZbQ/exec';

export interface ProxyOptions {
  cacheTTL?: number; // Cache time in seconds
  timeout?: number;  // Request timeout in milliseconds
}

export async function proxyToGoogleScript(
  path: string, 
  queryParams: Record<string, string> = {},
  options: ProxyOptions = {}
): Promise<any> {
  const { cacheTTL = 300, timeout = 30000 } = options;
  
  // Create cache key from path and query params
  const cacheKey = createCacheKey(path, queryParams);
  
  // Try to get from cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`Cache HIT for: ${cacheKey}`);
    return cachedData;
  }

  console.log(`Cache MISS for: ${cacheKey}`);

  // Build URL with path and query parameters
  const url = new URL(GOOGLE_SCRIPT_URL);
  url.searchParams.set('path', path);
  
  // Add all query parameters
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  console.log(`Proxying to: ${url.toString()}`);

  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; API-Proxy/1.0)',
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text.substring(0, 500));
      throw new Error('Response is not JSON format');
    }

    const data = await response.json();
    
    // Cache the successful response
    cache.set(cacheKey, data, cacheTTL);
    
    console.log(`Successfully cached response for: ${cacheKey}`);
    return data;

  } catch (error) {
    console.error('Proxy error:', error);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw new Error(`Proxy failed: ${error.message}`);
    }
    
    throw new Error('Unknown proxy error');
  }
}

function createCacheKey(path: string, queryParams: Record<string, string>): string {
  const sortedParams = Object.keys(queryParams)
    .sort()
    .map(key => `${key}=${queryParams[key]}`)
    .join('&');
  
  return `${path}${sortedParams ? '?' + sortedParams : ''}`;
}

export function getCacheStats() {
  return cache.getStats();
}

export function clearCache() {
  cache.clear();
}