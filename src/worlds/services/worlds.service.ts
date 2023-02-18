import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorldEntity } from '../../db';
import { World } from '../models/world.model';
import { LevelsService } from '../levels/services/levels.service';
import { WorldsEntityConverter } from './worlds-entity.converter';

export class WorldsService {
  constructor(
    @InjectRepository(WorldEntity)
    private readonly worldRepository: Repository<WorldEntity>,
    private readonly levelsService: LevelsService,
    private readonly worldsEntityConverter: WorldsEntityConverter,
  ) {}

  async findAll(): Promise<World[]> {
    const worldEntities: WorldEntity[] = await this.worldRepository.find({
      relations: { levels: true },
    });
    return worldEntities?.map((worldEntity) =>
      this.worldsEntityConverter.covertFrom(worldEntity),
    );
  }

  async findOne(id: number): Promise<World> {
    const worldEntity: WorldEntity = await this.worldRepository.findOne({
      where: { id },
      relations: { levels: true },
    });
    return this.worldsEntityConverter.covertFrom(worldEntity);
  }

  async create(world: World): Promise<World> {
    let worldEntity: WorldEntity = this.worldsEntityConverter.covertTo(world);
    worldEntity = await this.worldRepository.save(worldEntity);
    if (world.levels) {
      await this.levelsService.createAll(worldEntity.id, world.levels);
    }
    return this.worldsEntityConverter.covertFrom(worldEntity);
  }
}
