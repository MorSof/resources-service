import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ResourceRequestDto } from '../../../../core/resources/dtos/resource-request.dto';

export class GoalRequestDto {
  @ApiModelProperty({
    type: 'number',
    description: 'The score of the goal',
  })
  score: number;

  @ApiModelProperty({
    type: ResourceRequestDto,
    isArray: true,
  })
  rewards: ResourceRequestDto[];
}
