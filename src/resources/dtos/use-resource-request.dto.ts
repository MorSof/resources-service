import { ApiProperty } from '@nestjs/swagger';

export class UseResourceDto {
  @ApiProperty({
    type: 'number',
  })
  readonly amount: number;
}
