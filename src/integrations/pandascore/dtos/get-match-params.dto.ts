import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetMatchParamsDto {
  @IsString()
  id_or_slug: string;
}
