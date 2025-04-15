import { IsNumberString, IsOptional } from 'class-validator';

export class GetPostsByCategoryQueryDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
