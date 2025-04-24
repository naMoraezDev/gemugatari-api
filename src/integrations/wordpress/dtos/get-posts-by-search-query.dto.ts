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
  first?: string;

  @IsOptional()
  @IsNumberString()
  last?: string;

  @IsString()
  @IsOptional()
  after?: string;

  @IsString()
  @IsOptional()
  before?: string;
}
