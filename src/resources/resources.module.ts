import { InternalServerErrorException, Module } from '@nestjs/common';
import { ResourcesController } from './controllers/resources.controller';
import { ResourcesService } from './services/resources.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesDtoConverter } from './services/resources-dto.converter';
import { ResourcesEntityConverter } from './services/resources-entity.converter';
import { ResourceEntity } from './entities/resource.entity';
import { RingsQuestResourcesFactory } from '../rings-quest-resources/services/rings-quest-resources-factory.service';
import { ResourcesFactory } from './services/resources-factory.service';
import { ConfigService } from '@nestjs/config';
import { ResourceTransactionDtoConverter } from './services/resource-transaction-dto.converter';

@Module({
  controllers: [ResourcesController],
  providers: [
    ResourcesService,
    ResourcesDtoConverter,
    ResourceTransactionDtoConverter,
    ResourcesEntityConverter,
    {
      provide: ResourcesFactory,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const gameName = configService.get('GAME_NAME');
        switch (gameName) {
          case 'rings-quest':
            return new RingsQuestResourcesFactory();
        }
        throw new InternalServerErrorException(
          `No factory provider was found under the game name ${gameName}`,
        );
      },
    },
  ],
  imports: [TypeOrmModule.forFeature([ResourceEntity])],
})
export class ResourcesModule {}
