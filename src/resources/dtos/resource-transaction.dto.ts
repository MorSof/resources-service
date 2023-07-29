import { ApiProperty } from '@nestjs/swagger';

export class ResourceTransactionDto {
  @ApiProperty({
    type: 'number',
    required: true,
  })
  amount: number;

  @ApiProperty({
    type: 'number',
    required: true,
  })
  id: number;
}

export class ResourceTransactionDtoArray {
  @ApiProperty({ type: [ResourceTransactionDto], required: true })
  resources: ResourceTransactionDto[];
}
