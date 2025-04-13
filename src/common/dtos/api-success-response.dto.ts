import { ApiProperty } from '@nestjs/swagger';

export class ApiSuccessResponseDto<T> {
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
    example: {
      timestamp: '2025-03-01T12:00:00.000Z',
      request_id: '123e4567-e89b-12d3-a456-426614174000',
      cached: true,
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
  }) {
    this.success = options.success;

    if (options.data !== undefined) {
      this.data = options.data;
    }

    this.meta = {
      timestamp: new Date().toISOString(),
    };

    if (options.request_id) {
      this.meta.request_id = options.request_id;
    }
  }

  static success<T>(
    data: T,
    options?: {
      request_id?: string;
    },
  ): ApiSuccessResponseDto<T> {
    return new ApiSuccessResponseDto({
      success: true,
      data,
      request_id: options?.request_id,
    });
  }
}
