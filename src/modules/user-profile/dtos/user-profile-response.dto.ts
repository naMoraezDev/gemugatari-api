import { ApiProperty } from '@nestjs/swagger';

export class UserProfileResponseDto {
  @ApiProperty({
    example: 'ABC123XYZ789',
  })
  uid: string;

  @ApiProperty({
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    example: '(51) 12345-6789',
  })
  phone: string;

  @ApiProperty({
    example: [],
    type: [String],
  })
  liked: string[];

  @ApiProperty({
    example: [],
    type: [String],
  })
  favorited: string[];

  @ApiProperty({
    example: '2025-03-01T12:00:00.000Z',
  })
  createdAt: string;

  @ApiProperty({
    example: '2025-03-01T12:00:00.000Z',
  })
  updatedAt: string;
}
