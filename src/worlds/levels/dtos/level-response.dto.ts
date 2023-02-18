import { ComboResponseDto } from '../combo/dtos/combo-response.dto';
import { GoalResponseDto } from '../goals/dtos/goal-response.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { PlayableResponseDto } from '../playable/dtos/playable-response.dto';

export class LevelResponseDto {
  @ApiModelProperty({
    type: 'string',
    description: 'The id of the level',
    required: true,
  })
  id: number;

  @ApiModelProperty({
    type: PlayableResponseDto,
    description: 'The playables of the level',
    isArray: true,
    required: true,
  })
  playables: PlayableResponseDto[];

  @ApiModelProperty({
    type: 'object',
    description: 'The stats of the level',
    required: true,
  })
  stats: {
    playables: {
      countByName: object;
      total: number;
    };
  };

  @ApiModelProperty({
    type: 'string',
    description: 'The lives of the level',
    required: true,
  })
  lives: number;

  @ApiModelProperty({
    isArray: true,
    type: GoalResponseDto,
    description: 'An array of goals for the level',
  })
  goals: GoalResponseDto[];

  @ApiModelProperty({
    type: ComboResponseDto,
    description: 'The combo for the level',
  })
  combo: ComboResponseDto;

  @ApiModelProperty({
    type: 'number',
    description: 'The ID of the models the level belongs to',
    nullable: true,
  })
  worldId: number;

  constructor(partial: Partial<LevelResponseDto>) {
    Object.assign(this, partial);
  }
}
