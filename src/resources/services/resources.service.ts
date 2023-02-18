import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from '../models/resource.model';
import { ResourcesEntityConverter } from './resources-entity.converter';
import { ResourceEntity } from '../entities/resource.entity';

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

  async findAllResources(): Promise<Resource[]> {
    const resourceEntities: ResourceEntity[] =
      await this.resourceRepository.find();
    return resourceEntities.map((resourceEntity) =>
      this.resourcesEntityConverter.convertFrom(resourceEntity),
    );
  }

  async findResourcesById(id: string): Promise<Resource> {
    const resourceEntity = await this.resourceRepository.findOneBy({ id });
    return this.resourcesEntityConverter.convertFrom(resourceEntity);
  }
}
