import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({
    example: true,
  })
  success: boolean;

  @ApiProperty({
    required: false,
  })
  data?: T;

  @ApiProperty({
    required: false,
    example: { code: 'ERROR_CODE', message: 'Error message', details: {} },
  })
  error?: {
    code: string;
    message: string;
    details?: any;
  };

  @ApiProperty({
    required: false,
    example: {
      timestamp: '2025-03-01T12:00:00.000Z',
      request_id: '123e4567-e89b-12d3-a456-426614174000',
      cached: false,
    },
  })
  meta?: {
    timestamp: string;
    request_id?: string;
    cached?: boolean;
  };

  constructor(options: {
    success: boolean;
    data?: T;
    errorCode?: string;
    errorMessage?: string;
    errorDetails?: any;
    request_id?: string;
    cached?: boolean;
  }) {
    this.success = options.success;

    if (options.data !== undefined) {
      this.data = options.data;
    }

    if (!options.success) {
      this.error = {
        code: options.errorCode || 'UNKNOWN_ERROR',
        message: options.errorMessage || 'An unknown error has occurred',
      };

      if (options.errorDetails) {
        this.error.details = options.errorDetails;
      }
    }

    this.meta = {
      timestamp: new Date().toISOString(),
    };

    if (options.request_id) {
      this.meta.request_id = options.request_id;
    }

    if (options.cached !== undefined) {
      this.meta.cached = options.cached;
    }
  }

  static success<T>(
    data: T,
    options?: {
      request_id?: string;
      cached?: boolean;
    },
  ): ApiResponseDto<T> {
    return new ApiResponseDto({
      success: true,
      data,
      request_id: options?.request_id,
      cached: options?.cached,
    });
  }

  static error<T>(options: {
    errorCode: string;
    errorMessage: string;
    errorDetails?: any;
    request_id?: string;
    cached?: boolean;
  }): ApiResponseDto<T> {
    return new ApiResponseDto({
      success: false,
      errorCode: options.errorCode,
      errorMessage: options.errorMessage,
      errorDetails: options.errorDetails,
      request_id: options.request_id,
      cached: options.cached,
    });
  }
}
