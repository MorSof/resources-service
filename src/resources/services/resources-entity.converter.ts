import { Injectable } from '@nestjs/common';
import { ResourceModel } from '../models/resource.model';
import { ResourceEntity } from '../entities/resource.entity';

@Injectable()
export class ResourcesEntityConverter {
  toEntity(resource: ResourceModel): ResourceEntity {
    const entity = new ResourceEntity();
    entity.id = resource.id;
    entity.belongId = resource.belongId;
    entity.belongType = resource.belongType;
    entity.type = resource.type;
    entity.name = resource.name;
    entity.amount = resource.amount;
    entity.receivingProbability = resource.receivingProbability;
    entity.rarenessProbability = resource.rarenessProbability;
    entity.extraArgs = resource.extraArgs;
    return entity;
  }

  toModel(entity: ResourceEntity): ResourceModel {
    const model = new ResourceModel();
    model.id = entity.id;
    model.belongId = entity.belongId;
    model.belongType = entity.belongType;
    model.type = entity.type;
    model.name = entity.name;
    model.amount = entity.amount;
    model.receivingProbability = entity.receivingProbability;
    model.rarenessProbability = entity.rarenessProbability;
    model.extraArgs = entity.extraArgs;
    return model;
  }
}
