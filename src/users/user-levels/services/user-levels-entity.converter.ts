import { Injectable } from '@nestjs/common';
import { UserLevelEntity } from '../../../db';
import { UserLevel } from '../models/user-level.model';

@Injectable()
export class UserLevelsEntityConverter {
  public convertFrom(userLevelEntity: UserLevelEntity): UserLevel {
    const { id, stars, userId, levelId } = userLevelEntity;
    return new UserLevel({ id, stars, userId, levelId });
  }

  public convertTo(userLevel: UserLevel): UserLevelEntity {
    const { id, stars, userId, levelId } = userLevel;
    return new UserLevelEntity({ id, stars, userId, levelId });
  }
}
