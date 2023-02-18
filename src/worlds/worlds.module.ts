import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorldEntity } from '../db';
import { WorldsController } from './controllers/worlds.controller';
import { WorldsService } from './services/worlds.service';
import { LevelsModule } from './levels/levels.module';
import { WorldsEntityConverter } from './services/worlds-entity.converter';
import { WorldsDtoConverter } from './services/worlds-dto.converter';

@Module({
  controllers: [WorldsController],
  providers: [WorldsService, WorldsEntityConverter, WorldsDtoConverter],
  imports: [TypeOrmModule.forFeature([WorldEntity]), LevelsModule],
})
export class WorldsModule {}
