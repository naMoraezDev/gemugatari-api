import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateContentFromTopicRequestDto {
  @ApiProperty({
    example: 'Interesting article topic',
  })
  @IsString()
  @IsNotEmpty()
  topic: string;
}
