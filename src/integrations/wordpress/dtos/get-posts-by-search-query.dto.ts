import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
} from 'class-validator';

export class GetPostsBySearchQueryDto {
  @IsString()
  @IsNotEmpty()
  term: string;

  @IsOptional()
  @IsNumberString()
  size?: string;

  @IsOptional()
  @IsNumberString()
  offset?: string;
}
