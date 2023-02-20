import { ApiProperty } from '@nestjs/swagger';
import { OwnerType } from '../models/owner-type.enum';
import { ResourceType } from '../models/resource-type.enum';
import { ResourcesNames } from '../models/resources-names.enum';

export class ResourceResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: string;

  @ApiProperty({
    enum: [Object.values(OwnerType)],
  })
  ownerType: OwnerType;

  @ApiProperty({
    enum: [Object.values(ResourceType)],
  })
  type: ResourceType;

  @ApiProperty({
    enum: [Object.values(ResourcesNames)],
  })
  name: ResourcesNames;

  @ApiProperty({
    nullable: true,
  })
  amount: number;

  @ApiProperty({
    nullable: true,
  })
  receivingProbability: number;

  @ApiProperty({
    nullable: true,
  })
  rarenessProbability: number;

  @ApiProperty({
    nullable: true,
  })
  extraArgs: object;

  @ApiProperty({
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
  })
  createdAt: Date;
}
