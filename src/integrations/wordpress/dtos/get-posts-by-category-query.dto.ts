import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetPostsByCategoryQueryDto {
  @IsOptional()
  @IsNumberString()
  size?: string;

  @IsOptional()
  @IsNumberString()
  offset?: string;
}
