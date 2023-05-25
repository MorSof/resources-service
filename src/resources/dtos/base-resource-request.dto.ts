import { ApiProperty } from '@nestjs/swagger';
import { OwnerType } from '../models/owner-type.enum';
import { InnerResourceRequestDto } from './inner-resource-request.dto';

export class BaseResourceRequestDto {
  @ApiProperty()
  readonly ownerId: string;

  @ApiProperty({
    enum: [Object.values(OwnerType)],
    default: 'user',
  })
  readonly ownerType: OwnerType;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  readonly groupId?: string;

  @ApiProperty({
    default: 'wrapper',
  })
  readonly type: string;

  @ApiProperty({
    default: 'chest',
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
    isArray: true,
    type: InnerResourceRequestDto,
    description: 'An array of resources in the resource',
    required: false,
  })
  resources?: BaseResourceRequestDto[];

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    required: false,
    nullable: true,
  })
  readonly extraArgs: Record<string, any>;
}
