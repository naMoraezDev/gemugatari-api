import { MatchDto } from './dtos/match.dto';
import { MatchesService } from './matches.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';
import { GetMatchesQueryDto } from 'src/integrations/pandascore/dtos/get-matches-query.dto';

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  @ApiQuery({
    type: String,
    required: false,
    name: 'videogame',
  })
  @ApiQuery({
    type: String,
    required: false,
    name: 'limit',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: MatchDto, isArray: true })
  @ApiResponse({
    description: 'Serviço indisponível',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getMatches(@Query() query: GetMatchesQueryDto) {
    return this.matchesService.getMatches(query);
  }
}
