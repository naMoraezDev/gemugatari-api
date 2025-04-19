import { HttpException } from '@nestjs/common';

export async function fetchWithTimeout(
  url: string,
  options: any = {},
  timeout: number = 5000,
): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export function checkEnvironmentVariables(variables: string[]): string[] {
  return variables.filter((varName) => !process.env[varName]);
}

export function formatMemoryUsage(bytes: number): string {
  return `${Math.round(bytes / (1024 * 1024))} MB`;
}

export async function checkWithTimeout<T>(
  checkFn: () => Promise<T>,
  timeout: number = 5000,
): Promise<T> {
  return new Promise<T>(async (resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new HttpException('Health check timeout', 408));
    }, timeout);

    try {
      const result = await checkFn();
      clearTimeout(timeoutId);
      resolve(result);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
}

export interface HealthStatus {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptime: string;
  checks: HealthChecks;
  system?: SystemInfo;
  responseTime?: string;
  service?: {
    env: string;
    name: string;
    version: string;
  };
}

export interface HealthChecks {
  envVars?: {
    status: 'ok' | 'error';
    checked: number;
    missing: string[];
    error?: string;
  };
  redis?: {
    status: 'ok' | 'error';
    message?: string;
    error?: string;
  };
  wordpress?: {
    status: 'ok' | 'error';
    message?: string;
    error?: string;
  };
  pandascore?: {
    status: 'ok' | 'error';
    message?: string;
    error?: string;
  };
  youtube?: {
    status: 'ok' | 'error';
    message?: string;
    error?: string;
  };
  twitch?: {
    status: 'ok' | 'error';
    message?: string;
    error?: string;
  };
  gemini?: {
    status: 'ok' | 'error';
    message?: string;
    error?: string;
  };
  [key: string]: any;
}

export interface SystemInfo {
  memory: {
    total: string;
    free: string;
    usage: {
      rss: string;
      heapTotal: string;
      heapUsed: string;
    };
  };
  cpuLoad: number[];
  platform: string;
  cpuCores: number;
}
