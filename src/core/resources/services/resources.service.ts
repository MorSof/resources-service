import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceEntity } from '../../../db';
import { ResourcesEntityConverter } from '../convertes/resources-entity.converter';
import { Resource } from '../models/resource.model';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
    private readonly resourcesEntityConverter: ResourcesEntityConverter,
  ) {}

  async createResource(resource: Resource): Promise<Resource> {
    let resourceEntity: ResourceEntity =
      this.resourcesEntityConverter.convertTo(resource);
    resourceEntity = await this.resourceRepository.save(resourceEntity);
    return this.resourcesEntityConverter.convertFrom(resourceEntity);
  }

  async getResourcesByOwner(
    ownerType: string,
    ownerId: string,
  ): Promise<Resource[]> {
    const resourcesEntities: ResourceEntity[] =
      await this.resourceRepository.find({
        where: { ownerType, ownerId },
      });
    return resourcesEntities.map((resourceEntity) =>
      this.resourcesEntityConverter.convertFrom(resourceEntity),
    );
  }
}
