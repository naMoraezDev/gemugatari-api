import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateIf } from 'class-validator';

export class UpdateLikedDto {
  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsArray()
  @ValidateIf((o) => o.addLiked !== undefined)
  @IsString({ each: true })
  addLiked?: string[];

  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsArray()
  @ValidateIf((o) => o.deleteLiked !== undefined)
  @IsString({ each: true })
  deleteLiked?: string[];
}
