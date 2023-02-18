import { Injectable } from '@nestjs/common';
import { Level } from '../models/level.model';
import { LevelEntity } from '../../../db';

@Injectable()
export class LevelsEntityConverter {
  public convertFrom(levelEntity: LevelEntity): Level {
    const { id, playables, lives, combo, worldId, stats, goals } = levelEntity;
    return new Level({ id, playables, lives, combo, worldId, stats, goals });
  }

  public convertTo(level: Level): LevelEntity {
    const { id, playables, lives, combo, worldId, stats, goals } = level;
    return new LevelEntity({
      id,
      playables,
      lives,
      combo,
      worldId,
      stats,
      goals,
    });
  }
}
