import { ApiProperty } from '@nestjs/swagger';
import { OwnerType } from '../models/owner-type.enum';

export class UpdateResourceRequestDto {
  @ApiProperty()
  readonly ownerId: string;

  @ApiProperty({
    enum: [Object.values(OwnerType)],
    default: 'user',
  })
  readonly ownerType: OwnerType;

  @ApiProperty({
    default: 'currency',
  })
  readonly type: string;

  @ApiProperty({
    default: 'coins',
  })
  readonly name: string;

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
