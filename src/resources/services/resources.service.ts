import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceEntity } from '../entities/resource.entity';
import { ResourcesEntityConverter } from './resources-entity.converter';
import { Resource } from '../models/resource.model';
import { OwnerType } from '../models/owner-type.enum';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
    private readonly converter: ResourcesEntityConverter,
  ) {}

  async create(resources: Resource[]): Promise<Resource[]> {
    let resourceEntities: ResourceEntity[] = resources.map((resource) =>
      this.converter.toEntity(resource),
    );
    resourceEntities = await this.resourceRepository.save(resourceEntities);
    return resourceEntities.map((entity) => this.converter.toModel(entity));
  }

  async update(id: number, resource: Resource): Promise<Resource> {
    let entity = await this.resourceRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    entity = this.converter.toEntity(resource);
    const updatedEntity = await this.resourceRepository.save(entity);
    return this.converter.toModel(updatedEntity);
  }

  async findById(id: number, fulfillProbability?: boolean): Promise<Resource> {
    const entity = await this.resourceRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    const model = this.converter.toModel(entity);
    if (fulfillProbability) {
      model.fulfillProbability();
    }
    return model;
  }

  async findByValues(
    ownerId: string,
    ownerType: OwnerType,
    groupId: string,
    fulfillProbability?: boolean,
  ): Promise<Resource[]> {
    const entities = await this.resourceRepository.find({
      where: { ownerId, ownerType, groupId },
    });
    const models = entities.map((entity) => this.converter.toModel(entity));
    if (fulfillProbability) {
      models.forEach((model) => model.fulfillProbability());
    }
    return models;
  }

  async delete(id: number): Promise<void> {
    const result = await this.resourceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
  }

  async deleteByOwner(ownerType: OwnerType, ownerId: string): Promise<void> {
    const result = await this.resourceRepository.delete({ ownerType, ownerId });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Resource with ownerType/ownerId ${ownerType}/${ownerId} not found`,
      );
    }
  }

  async collect(id: number, amount: number): Promise<Resource> {
    const entity = await this.resourceRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    if (entity.amount != null) {
      entity.amount += amount;
    } else {
      throw new BadRequestException(`Resource with id ${id} amount is null`);
    }
    const updatedEntity = await this.resourceRepository.save(entity);
    return this.converter.toModel(updatedEntity);
  }

  async use(id: number, amount: number): Promise<Resource> {
    const entity = await this.resourceRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    if (entity.amount != null) {
      if (entity.amount - amount > 0) {
        entity.amount -= amount;
      } else {
        entity.amount = 0;
      }
    } else {
      throw new BadRequestException(`Resource with id ${id} amount is null`);
    }
    const updatedEntity = await this.resourceRepository.save(entity);
    return this.converter.toModel(updatedEntity);
  }
}
