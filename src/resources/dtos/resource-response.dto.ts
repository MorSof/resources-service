import { ApiProperty } from '@nestjs/swagger';

export class ResourceResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: string;

  @ApiProperty({
    enum: ['USER', 'LEVEL'],
  })
  ownerType: string;

  @ApiProperty({
    enum: ['CURRENCY', 'BOOSTER'],
  })
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
