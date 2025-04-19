import { IsString, IsNotEmpty } from 'class-validator';

export class GetTwitchUserDataParamDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
