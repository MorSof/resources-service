import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Level } from '../models/level.model';
import { LevelEntity } from '../../../db';
import { LevelsEntityConverter } from './levels-entity.converter';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(LevelEntity)
    private readonly levelsRepository: Repository<LevelEntity>,
    private readonly levelsEntityConverter: LevelsEntityConverter,
  ) {}

  public async findOne(worldId: number, id: number): Promise<Level> {
    const levelEntity: LevelEntity = await this.levelsRepository.findOne({
      where: { worldId, id },
    });
    return this.levelsEntityConverter.convertFrom(levelEntity);
  }

  public async findAll(worldId: number): Promise<Level[]> {
    const levelEntities: LevelEntity[] = await this.levelsRepository.find({
      where: { worldId },
    });
    return levelEntities?.map((levelEntity) =>
      this.levelsEntityConverter.convertFrom(levelEntity),
    );
  }

  public async create(worldId: number, level: Level): Promise<Level> {
    level.worldId = worldId;
    let levelEntity: LevelEntity = this.levelsEntityConverter.convertTo(level);
    levelEntity = await this.levelsRepository.save(levelEntity);
    return this.levelsEntityConverter.convertFrom(levelEntity);
  }

  public async createAll(worldId: number, levels: Level[]): Promise<Level[]> {
    let levelEntities: LevelEntity[] = levels?.map((level) => {
      level.worldId = worldId;
      return this.levelsEntityConverter.convertTo(level);
    });
    levelEntities = await this.levelsRepository.save(levelEntities);
    return levelEntities?.map((levelEntity) =>
      this.levelsEntityConverter.convertFrom(levelEntity),
    );
  }

  public async update(
    worldId: number,
    id: number,
    level: Level,
  ): Promise<Level> {
    level.worldId = worldId;
    level.id = id;
    let levelEntity: LevelEntity = this.levelsEntityConverter.convertTo(level);
    levelEntity = await this.levelsRepository.save(levelEntity);
    return this.levelsEntityConverter.convertFrom(levelEntity);
  }

  public async remove(worldId: number, id: number): Promise<void> {
    await this.levelsRepository.delete({ worldId, id });
  }
}
