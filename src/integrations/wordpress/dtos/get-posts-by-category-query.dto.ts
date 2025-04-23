import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetPostsByCategoryQueryDto {
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
