import { ApiProperty } from '@nestjs/swagger';

export class CollectResourceDto {
  @ApiProperty({
    type: 'number',
  })
  readonly amount: number;
}
