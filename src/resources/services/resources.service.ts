import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceEntity } from '../entities/resource.entity';
import { ResourcesEntityConverter } from './resources-entity.converter';
import { ResourceModel } from '../models/resource.model';
import { BelongType } from '../models/belong-type.enum';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
    private readonly converter: ResourcesEntityConverter,
  ) {}

  async create(resources: ResourceModel[]): Promise<ResourceModel[]> {
    let resourceEntities: ResourceEntity[] = resources.map((resource) =>
      this.converter.toEntity(resource),
    );
    resourceEntities = await this.resourceRepository.save(resourceEntities);
    return resourceEntities.map((entity) => this.converter.toModel(entity));
  }

  async update(id: number, resource: ResourceModel): Promise<ResourceModel> {
    const entity = await this.resourceRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    this.converter.toEntity(resource);
    const updatedEntity = await this.resourceRepository.save(entity);
    return this.converter.toModel(updatedEntity);
  }

  async findById(
    id: number,
    fulfillProbability?: boolean,
  ): Promise<ResourceModel> {
    const entity = await this.resourceRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    const model = this.converter.toModel(entity);
    // if (fulfillProbability) {
    // TODO business login
    // }
    return model;
  }

  async findByValues(
    belongId: string,
    belongType: BelongType,
    fulfillProbability?: boolean,
  ): Promise<ResourceModel[]> {
    const entities = await this.resourceRepository.find({
      where: { belongId, belongType },
    });
    const models = entities.map((entity) => this.converter.toModel(entity));
    // if (fulfillProbability) {
    //   TODO business login
    // }
    return models;
  }

  async delete(id: number): Promise<void> {
    const result = await this.resourceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
  }

  async collect(id: number, amount: number): Promise<ResourceModel> {
    const entity = await this.resourceRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    // TODO business login
    const updatedEntity = await this.resourceRepository.save(entity);
    return this.converter.toModel(updatedEntity);
  }

  async use(id: number, amount: number): Promise<ResourceModel> {
    const entity = await this.resourceRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    // TODO business login
    const updatedEntity = await this.resourceRepository.save(entity);
    return this.converter.toModel(updatedEntity);
  }
}
