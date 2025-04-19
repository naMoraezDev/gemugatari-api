import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserProfileDto {
  @ApiProperty({
    required: true,
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
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
