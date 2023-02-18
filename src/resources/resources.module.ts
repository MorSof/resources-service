import { Module } from '@nestjs/common';
import { ResourcesController } from './controllers/resources.controller';
import { ResourcesService } from './services/resources.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesDtoConverter } from './services/resources-dto.converter';
import { ResourcesEntityConverter } from './services/resources-entity.converter';
import { ResourceEntity } from './entities/resource.entity';

@Module({
  controllers: [ResourcesController],
  providers: [
    ResourcesService,
    ResourcesDtoConverter,
    ResourcesEntityConverter,
  ],
  imports: [TypeOrmModule.forFeature([ResourceEntity])],
})
export class ResourcesModule {}
