import { Injectable } from '@nestjs/common';
import { WorldRequestDto } from '../dtos/world-request.dto';
import { World } from '../models/world.model';
import { WorldResponseDto } from '../dtos/world-response.dto';
import { LevelsDtoConverter } from '../levels/services/levels-dto.converter';

@Injectable()
export class WorldsDtoConverter {
  constructor(private readonly levelsDtoConverter: LevelsDtoConverter) {}

  public convertFrom(worldRequestDto: WorldRequestDto): World {
    const { id, name, levels } = worldRequestDto;
    return new World({
      id,
      name,
      levels: levels.map((levelDto) =>
        this.levelsDtoConverter.convertFrom(levelDto),
      ),
    });
  }

  public convertTo(world: World): WorldResponseDto {
    const { id, name, levels } = world;
    return new WorldResponseDto({
      id,
      name,
      levels: levels.map((level) => this.levelsDtoConverter.convertTo(level)),
    });
  }
}
