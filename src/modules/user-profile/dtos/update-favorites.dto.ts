import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateIf } from 'class-validator';

export class UpdateFavoritedDto {
  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsArray()
  @ValidateIf((o) => o.addLiked !== undefined)
  @IsString({ each: true })
  addLFavorite?: string[];

  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsArray()
  @ValidateIf((o) => o.deleteLiked !== undefined)
  @IsString({ each: true })
  deleteFavorite?: string[];
}
