import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLevelsEntityConverter } from './user-levels-entity.converter';
import { UserLevel } from '../models/user-level.model';
import { UserLevelEntity } from '../../../db';

@Injectable()
export class UserLevelsService {
  constructor(
    @InjectRepository(UserLevelEntity)
    private readonly userLevelRepository: Repository<UserLevelEntity>,
    private readonly userLevelsEntityConverter: UserLevelsEntityConverter,
  ) {}

  async findAllUserLevels(): Promise<UserLevel[]> {
    const userLevelEntities: UserLevelEntity[] =
      await this.userLevelRepository.find();
    return userLevelEntities.map((userLevelEntity) =>
      this.userLevelsEntityConverter.convertFrom(userLevelEntity),
    );
  }
}
