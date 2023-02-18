import { Injectable } from '@nestjs/common';
import { CreateResourceRequestDto } from '../dtos/create-resource-request.dto';
import { ResourceModel } from '../models/resource.model';
import { ResourceResponseDto } from '../dtos/resource-response.dto';
import { UpdateResourceRequestDto } from '../dtos/update-resource-request.dto';
import { BelongType } from '../models/belong-type.enum';
import { ResourceType } from '../models/resource-type.enum';

@Injectable()
export class ResourcesDtoConverter {
  public toModel(
    dto: CreateResourceRequestDto | UpdateResourceRequestDto,
  ): ResourceModel {
    const model = new ResourceModel();

    model.belongId = dto.belongId;
    model.belongType = BelongType[dto.belongType];
    model.type = ResourceType[dto.type];
    model.name = dto.name;
    model.amount = dto.amount;
    model.receivingProbability = dto.receivingProbability;
    model.rarenessProbability = dto.rarenessProbability;
    model.extraArgs = dto.extraArgs;

    return model;
  }

  public toDto(model: ResourceModel): ResourceResponseDto {
    const dto = new ResourceResponseDto();

    dto.id = model.id;
    dto.belongId = model.belongId;
    dto.belongType = model.belongType;
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
