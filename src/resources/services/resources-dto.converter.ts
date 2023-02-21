import { Injectable } from '@nestjs/common';
import { CreateResourceRequestDto } from '../dtos/create-resource-request.dto';
import { Resource } from '../models/resource.model';
import { ResourceResponseDto } from '../dtos/resource-response.dto';
import { UpdateResourceRequestDto } from '../dtos/update-resource-request.dto';
import { ResourcesFactory } from './resources-factory.service';

@Injectable()
export class ResourcesDtoConverter {
  constructor(private readonly resourcesFactory: ResourcesFactory) {}
  public toModel(
    dto: CreateResourceRequestDto | UpdateResourceRequestDto,
  ): Resource {
    const model = this.resourcesFactory.create(dto.name, dto.type);
    model.ownerId = dto.ownerId;
    model.ownerType = dto.ownerType;
    model.type = dto.type;
    model.name = dto.name;
    model.amount = dto.amount;
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
    dto.type = model.type;
    dto.name = model.name;
    dto.amount = model.amount;
    dto.receivingProbability = model.receivingProbability;
    dto.rarenessProbability = model.rarenessProbability;
    dto.extraArgs = model.extraArgs;
    dto.updatedAt = model.updatedAt;
    dto.createdAt = model.createdAt;
    return dto;
  }
}
