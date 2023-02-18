import { Module } from '@nestjs/common';
import { ResourcesEntityConverter } from './convertes/resources-entity.converter';
import { ResourcesDtoConverter } from './convertes/resources-dto.converter';
import { ResourcesService } from './services/resources.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceEntity } from '../../db';

@Module({
  providers: [
    ResourcesEntityConverter,
    ResourcesDtoConverter,
    ResourcesService,
  ],
  exports: [ResourcesEntityConverter, ResourcesDtoConverter, ResourcesService],
  imports: [TypeOrmModule.forFeature([ResourceEntity])],
})
export class ResourceModule {}
