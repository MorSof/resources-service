import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ComboRequestDto } from '../combo/dtos/combo-request.dto';
import { GoalRequestDto } from '../goals/dtos/goal-request.dto';
import { PlayableRequestDto } from '../playable/dtos/playable-request.dto';

export class LevelRequestDto {
  @ApiModelProperty({ type: 'integer', description: 'The ID of the level' })
  id: number;

  @ApiModelProperty({
    isArray: true,
    type: PlayableRequestDto,
    description: 'An array of playables for the level',
  })
  playables: PlayableRequestDto[];

  @ApiModelProperty({
    isArray: true,
    type: GoalRequestDto,
    description: 'An array of goals for the level',
  })
  goals: GoalRequestDto[];

  @ApiModelProperty({
    type: 'number',
    description: 'The lives of the level',
    required: true,
  })
  lives: number;

  @ApiModelProperty({
    description: 'The combo for the level',
  })
  combo: ComboRequestDto;

  @ApiModelProperty({
    type: 'number',
    description: 'The ID of the models the level belongs to',
    nullable: true,
  })
  worldId: number;
}
