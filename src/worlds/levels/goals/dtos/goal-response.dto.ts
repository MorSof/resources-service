import { ResourceResponseDto } from '../../../../core/resources/dtos/resource-response.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class GoalResponseDto {
  @ApiModelProperty({
    type: 'string',
    description: 'The score to achieve the goal',
    required: true,
  })
  score: number;

  @ApiModelProperty({
    type: ResourceResponseDto,
    description: 'The resources you achieve when winning the goal',
    isArray: true,
    required: true,
  })
  rewards: ResourceResponseDto[];

  constructor(partial: Partial<GoalResponseDto>) {
    Object.assign(this, partial);
  }
}
