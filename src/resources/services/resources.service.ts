import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
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
    const savedResources: Resource[] = [];
    for (const resource of resources) {
      const resourceEntity: ResourceEntity = this.converter.toEntity(resource);
      const savedEntity: ResourceEntity = await this.resourceRepository.save(
        resourceEntity,
      );
      const savedModel: Resource = this.converter.toModel(savedEntity);
      savedResources.push(savedModel);
    }

    return savedResources;
  }

  async update(id: number, resource: Resource): Promise<Resource> {
    let entity = await this.resourceRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    entity = this.converter.toEntity(resource);
    entity.id = id;
    const updatedEntity = await this.resourceRepository.save(entity);
    return this.converter.toModel(updatedEntity);
  }

  async findById(id: number, fulfillProbability?: boolean): Promise<Resource> {
    const entities = await this.resourceRepository.find({
      where: { id },
      relations: ['resources'],
    });

    if (!entities || entities.length == 0) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    const model = this.converter.toModel(entities[0]);
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
      where: { ownerId, ownerType, groupId, parent: IsNull() },
      relations: ['resources'],
    });
    const models = entities.map((entity) => this.converter.toModel(entity));
    if (fulfillProbability) {
      this.fulfillProbabilities(models);
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
        throw new BadRequestException(
          `Not enough amount to use. 
          Requested: ${amount}, 
          Actual: ${entity.amount}`,
        );
      }
    } else {
      throw new BadRequestException(`Resource with id ${id} amount is null`);
    }
    const updatedEntity = await this.resourceRepository.save(entity);
    return this.converter.toModel(updatedEntity);
  }

  private fulfillProbabilities(resources: Resource[]) {
    resources.forEach((resource) => {
      if (resource.resources) {
        this.fulfillProbabilities(resource.resources);
      }
      resource?.fulfillProbability();
    });
  }
}
