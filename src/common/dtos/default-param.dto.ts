import { IsString } from 'class-validator';

export class DefaultParamDto {
  @IsString()
  slug: string;
}
