import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserLevelResponseDto } from '../dtos/user-level-response.dto';
import { UserLevel } from '../models/user-level.model';
import { UserLevelsService } from '../services/user-levels.service';
import { UserLevelsDtoConverter } from '../services/user-levels-dto.converter';

@ApiTags('user levels')
@Controller('users/:userId/worlds')
export class UserLevelsController {
  constructor(
    private readonly userLevelsService: UserLevelsService,
    private readonly usersDtoConverter: UserLevelsDtoConverter,
  ) {}

  @ApiOkResponse({
    description: 'The user records',
    type: UserLevelResponseDto,
    isArray: true,
  })
  @Get()
  async findUserLevels(): Promise<UserLevelResponseDto[]> {
    const userLevels: UserLevel[] =
      await this.userLevelsService.findAllUserLevels();
    return userLevels.map((user) => this.usersDtoConverter.convertTo(user));
  }
}
