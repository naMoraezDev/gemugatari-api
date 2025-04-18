import { ApiProperty } from '@nestjs/swagger';

export class SinglePostProcessingResultDto {
  @ApiProperty({
    example: 'https://esportsnews.com/tournaments/world-finals-2025',
  })
  source_url: string;

  @ApiProperty({
    example: 'https://gamingblog.wordpress.com/?p=754',
  })
  created_post_url: string;
}

export class PostProcessingResultDto {
  @ApiProperty({
    example: 'https://esportsnews.com/tournaments/world-finals-2025',
  })
  source_url: string;

  @ApiProperty({
    example: 'https://gamingblog.wordpress.com/?p=754',
  })
  created_post_url: string;

  @ApiProperty({
    example: 'success',
  })
  status: string;
}

export class PostProcessingResponseDto {
  @ApiProperty({
    example: 28,
  })
  total_processed: number;

  @ApiProperty({
    example: 25,
  })
  successful: number;

  @ApiProperty({
    example: 3,
  })
  failed: number;

  @ApiProperty({
    type: [PostProcessingResultDto],
  })
  results: PostProcessingResultDto[];

  @ApiProperty({
    example: [
      'https://blockedsite.com/article/789',
      'https://downsite.org/post/321',
    ],
    type: [String],
  })
  failed_urls: string[];
}
