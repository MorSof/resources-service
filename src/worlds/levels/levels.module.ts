import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelsController } from './controllers/levels.controller';
import { LevelsService } from './services/levels.service';
import { LevelEntity } from '../../db';
import { LevelsEntityConverter } from './services/levels-entity.converter';
import { LevelsDtoConverter } from './services/levels-dto.converter';
import { ComboModule } from './combo/combo.module';
import { GoalModule } from './goals/goal.module';
import { PlayableModule } from './playable/playable.module';

@Module({
  controllers: [LevelsController],
  providers: [LevelsService, LevelsEntityConverter, LevelsDtoConverter],
  imports: [
    TypeOrmModule.forFeature([LevelEntity]),
    ComboModule,
    GoalModule,
    PlayableModule,
  ],
  exports: [LevelsService, LevelsEntityConverter, LevelsDtoConverter],
})
export class LevelsModule {}
