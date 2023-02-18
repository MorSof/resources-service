import { Injectable } from '@nestjs/common';
import { UserLevelRequestDto } from '../dtos/user-level-request.dto';
import { UserLevel } from '../models/user-level.model';
import { UserLevelResponseDto } from '../dtos/user-level-response.dto';

@Injectable()
export class UserLevelsDtoConverter {
  public convertFrom(userLevelRequestDto: UserLevelRequestDto): UserLevel {
    const { id, stars, userId, levelId } = userLevelRequestDto;
    return new UserLevel({ id, stars, userId, levelId });
  }

  public convertTo(userLevel: UserLevel): UserLevelResponseDto {
    const { id, stars, userId, levelId } = userLevel;
    return new UserLevelResponseDto({ id, stars, userId, levelId });
  }
}
