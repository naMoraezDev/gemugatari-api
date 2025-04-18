import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class GenerateContentsRequestDto {
  @ApiProperty({
    example: 'https://example.com',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  process_limit: number;
}
