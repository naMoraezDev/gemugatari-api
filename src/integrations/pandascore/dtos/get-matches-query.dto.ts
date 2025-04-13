import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetMatchesQueryDto {
  @IsString()
  @IsOptional()
  @IsIn([
    'cs-go',
    'dota-2',
    'cod-mw',
    'r6-siege',
    'valorant',
    'league-of-legends',
  ])
  videogame?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
