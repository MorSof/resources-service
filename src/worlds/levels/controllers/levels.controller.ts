import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { LevelsService } from '../services/levels.service';
import { Level } from '../models/level.model';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LevelRequestDto } from '../dtos/level-request.dto';
import { LevelResponseDto } from '../dtos/level-response.dto';
import { LevelsDtoConverter } from '../services/levels-dto.converter';

@ApiTags('levels')
@Controller('worlds/:worldId/levels')
export class LevelsController {
  constructor(
    private readonly levelsService: LevelsService,
    private readonly levelsDtoConverterService: LevelsDtoConverter,
  ) {}

  @ApiOkResponse({
    description: 'The level record',
    type: LevelResponseDto,
  })
  @Get(':id')
  async findOne(
    @Param('worldId') worldId: number,
    @Param('id') id: number,
  ): Promise<LevelResponseDto> {
    const level: Level = await this.levelsService.findOne(worldId, id);
    return this.levelsDtoConverterService.convertTo(level);
  }

  @ApiOkResponse({
    description: 'The level record',
    type: LevelResponseDto,
    isArray: true,
  })
  @Get()
  async findAll(
    @Param('worldId') worldId: number,
  ): Promise<LevelResponseDto[]> {
    const levels: Level[] = await this.levelsService.findAll(worldId);
    return levels.map((level) =>
      this.levelsDtoConverterService.convertTo(level),
    );
  }

  @ApiOkResponse({
    description: 'The level record',
    type: LevelResponseDto,
  })
  @Post()
  async create(
    @Param('worldId') worldId: number,
    @Body() levelRequestDto: LevelRequestDto,
  ): Promise<LevelResponseDto> {
    const level: Level = await this.levelsService.create(
      worldId,
      this.levelsDtoConverterService.convertFrom(levelRequestDto),
    );
    return this.levelsDtoConverterService.convertTo(level);
  }

  @ApiOkResponse({
    description: 'The level record',
    type: LevelResponseDto,
  })
  @Put()
  async update(
    @Param('worldId') worldId: number,
    @Param('id') id: number,
    @Body() levelRequestDto: LevelRequestDto,
  ): Promise<LevelResponseDto> {
    const level: Level = await this.levelsService.update(
      worldId,
      id,
      this.levelsDtoConverterService.convertFrom(levelRequestDto),
    );
    return this.levelsDtoConverterService.convertTo(level);
  }

  @Delete(':id')
  async remove(
    @Param('worldId') worldId: number,
    @Param('id') id: number,
  ): Promise<void> {
    return this.levelsService.remove(worldId, id);
  }
}
