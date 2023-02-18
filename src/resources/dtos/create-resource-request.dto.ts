import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceRequestDto {
  @ApiProperty()
  readonly belongId: string;

  @ApiProperty({
    enum: ['USER', 'LEVEL'],
    default: 'USER',
  })
  readonly belongType: string;

  @ApiProperty({
    enum: ['CURRENCY', 'BOOSTER'],
    default: 'CURRENCY',
  })
  readonly type: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
  })
  readonly amount: number;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
    minimum: 0,
    maximum: 1,
  })
  readonly receivingProbability: number;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
    minimum: 0,
    maximum: 1,
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