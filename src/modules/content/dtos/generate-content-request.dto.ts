import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateContentRequestDto {
  @ApiProperty({
    example: 'https://example.com',
  })
  @IsString()
  @IsNotEmpty()
  url: string;
}
