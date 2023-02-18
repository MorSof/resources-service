import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ResourceRequestDto } from '../../../../../core/resources/dtos/resource-request.dto';

export class BarRequestDto {
  @ApiModelProperty({
    type: 'number',
    description: 'The goal of the bar',
  })
  goal: number;

  @ApiModelProperty({
    type: ResourceRequestDto,
    isArray: true,
  })
  rewards: ResourceRequestDto[];
}
