import { ApiProperty } from '@nestjs/swagger';
import { OwnerType } from '../models/owner-type.enum';
import { ResourceType } from '../models/resource-type.enum';
import { ResourcesNames } from '../models/resources-names.enum';

export class CreateResourceRequestDto {
  @ApiProperty()
  readonly ownerId: string;

  @ApiProperty({
    enum: [Object.values(OwnerType)],
    default: 'user',
  })
  readonly ownerType: OwnerType;

  @ApiProperty({
    enum: [Object.values(ResourceType)],
    default: 'currency',
  })
  readonly type: ResourceType;

  @ApiProperty({
    enum: [Object.values(ResourcesNames)],
    default: 'coins',
  })
  readonly name: ResourcesNames;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
    default: null,
  })
  readonly amount?: number;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
    minimum: 0,
    maximum: 1,
    default: 1,
  })
  readonly receivingProbability: number;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
    minimum: 0,
    maximum: 1,
    default: 0.5,
  })
  readonly rarenessProbability: number;

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    required: false,
    nullable: true,
  })
  readonly extraArgs: Record<string, any>;
}
