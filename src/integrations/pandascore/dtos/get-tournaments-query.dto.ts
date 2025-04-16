import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetTournamentsQueryDto {
  @IsString()
  @IsOptional()
  @IsIn(['lol', 'csgo', 'codmw', 'dota2', 'r6siege', 'valorant'])
  videogame?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
