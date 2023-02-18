import { Injectable } from '@nestjs/common';
import { WorldRequestDto } from '../dtos/world-request.dto';
import { World } from '../models/world.model';
import { WorldResponseDto } from '../dtos/world-response.dto';
import { LevelsDtoConverter } from '../levels/services/levels-dto.converter';
import { LevelEntity, WorldEntity } from '../../db';
import { Level } from '../levels/models/level.model';
import { LevelsEntityConverter } from '../levels/services/levels-entity.converter';

@Injectable()
export class WorldsEntityConverter {
  constructor(private readonly levelsEntityConverter: LevelsEntityConverter) {}

  public covertFrom(worldEntity: WorldEntity): World {
    const { id, name, levels: levelsEntities } = worldEntity;
    const levels: Level[] = levelsEntities?.map((levelEntity) =>
      this.levelsEntityConverter.convertFrom(levelEntity),
    );
    return new World({ id, name, levels });
  }

  public covertTo(world: World): WorldEntity {
    const { id, name, levels } = world;
    const levelEntities: LevelEntity[] = levels?.map((level) =>
      this.levelsEntityConverter.convertTo(level),
    );
    return new WorldEntity({ id, name, levels: levelEntities });
  }
}
