import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @ApiProperty({
    required: false,
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({
    required: false,
    example: '(51) 12345-6789',
  })
  @IsOptional()
  @IsString()
  phone: string;
}
