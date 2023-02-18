import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLevelsController } from './controllers/user-levels.controller';
import { UserLevelsDtoConverter } from './services/user-levels-dto.converter';
import { UserLevelsService } from './services/user-levels.service';
import { UserLevelsEntityConverter } from './services/user-levels-entity.converter';
import { UserLevelEntity } from '../../db';

@Module({
  controllers: [UserLevelsController],
  providers: [
    UserLevelsService,
    UserLevelsDtoConverter,
    UserLevelsEntityConverter,
  ],
  imports: [TypeOrmModule.forFeature([UserLevelEntity])],
})
export class UserLevelsModule {}
