import { ApiProperty } from '@nestjs/swagger';
import { OwnerType } from '../models/owner-type.enum';

export class ResourceResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: string;

  @ApiProperty({
    enum: [Object.values(OwnerType)],
  })
  ownerType: OwnerType;

  @ApiProperty()
  type: string;

  @ApiProperty()
  name: string;

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
