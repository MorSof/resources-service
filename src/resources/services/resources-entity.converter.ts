import { Injectable } from '@nestjs/common';
import { Resource } from '../models/resource.model';
import { ResourceEntity } from '../entities/resource.entity';
import { ResourcesFactory } from './resources-factory.service';

@Injectable()
export class ResourcesEntityConverter {
  constructor(private readonly resourcesFactory: ResourcesFactory) {}
  toEntity(resource: Resource): ResourceEntity {
    const entity = new ResourceEntity();
    entity.id = resource.id;
    entity.ownerId = resource.ownerId;
    entity.ownerType = resource.ownerType;
    entity.groupId = resource.groupId;
    entity.type = resource.type;
    entity.name = resource.name;
    entity.amount = resource.amount;
    entity.receivingProbability = resource.receivingProbability;
    entity.rarenessProbability = resource.rarenessProbability;
    entity.resources = resource.resources?.map((childModel) => {
      const childEntity = this.toEntity(childModel);
      childEntity.ownerId = entity.ownerId;
      childEntity.ownerType = entity.ownerType;
      childEntity.groupId = entity.groupId;
      childEntity.parent = entity;
      return childEntity;
    });
    entity.extraArgs = resource.extraArgs;
    return entity;
  }

  toModel(entity: ResourceEntity): Resource {
    const model = this.resourcesFactory.create(entity.name, entity.type);
    model.id = entity.id;
    model.ownerId = entity.ownerId;
    model.ownerType = entity.ownerType;
    model.groupId = entity.groupId;
    model.type = entity.type;
    model.name = entity.name;
    model.amount = entity.amount;
    model.receivingProbability = entity.receivingProbability;
    model.rarenessProbability = entity.rarenessProbability;
    model.resources = entity.resources?.map((resource) =>
      this.toModel(resource),
    );
    model.extraArgs = entity.extraArgs;
    return model;
  }
}
