import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
} from 'class-validator';

export class VideosParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class VideosQueryDto {
  @IsOptional()
  @IsNumberString()
  limit?: string;
}
