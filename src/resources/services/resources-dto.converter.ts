import { Injectable } from '@nestjs/common';
import { Resource } from '../models/resource.model';
import { ResourceResponseDto } from '../dtos/resource-response.dto';
import { ResourcesFactory } from './resources-factory.service';
import { BaseResourceRequestDto } from '../dtos/base-resource-request.dto';

@Injectable()
export class ResourcesDtoConverter {
  constructor(private readonly resourcesFactory: ResourcesFactory) {}
  public toModel(dto: BaseResourceRequestDto): Resource {
    const model = this.resourcesFactory.create(dto.name, dto.type);
    model.ownerId = dto.ownerId;
    model.ownerType = dto.ownerType;
    model.groupId = dto.groupId;
    model.type = dto.type;
    model.name = dto.name;
    model.amount = dto.amount;
    model.resources = dto.resources?.map((child) => this.toModel(child));
    model.receivingProbability = dto.receivingProbability;
    model.rarenessProbability = dto.rarenessProbability;
    model.extraArgs = dto.extraArgs;
    return model;
  }

  public toDto(model: Resource): ResourceResponseDto {
    const dto = new ResourceResponseDto();
    dto.id = model.id;
    dto.ownerId = model.ownerId;
    dto.ownerType = model.ownerType;
    dto.groupId = model.groupId;
    dto.type = model.type;
    dto.name = model.name;
    dto.amount = model.amount;
    dto.receivingProbability = model.receivingProbability;
    dto.rarenessProbability = model.rarenessProbability;
    dto.resources = model.resources?.map((resource) => this.toDto(resource));
    dto.extraArgs = model.extraArgs;
    dto.updatedAt = model.updatedAt;
    dto.createdAt = model.createdAt;
    return dto;
  }
}
