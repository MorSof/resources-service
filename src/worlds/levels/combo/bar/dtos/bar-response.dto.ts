import { ResourceResponseDto } from '../../../../../core/resources/dtos/resource-response.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class BarResponseDto {
  @ApiModelProperty({
    type: 'number',
    description: 'The goal of the bar',
    required: true,
  })
  goal: number;

  @ApiModelProperty({
    type: ResourceResponseDto,
    description: 'The rewards of the bar',
    isArray: true,
    required: true,
  })
  rewards: ResourceResponseDto[];

  constructor(partial: Partial<BarResponseDto>) {
    Object.assign(this, partial);
  }
}
