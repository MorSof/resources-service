import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class PlayableRequestDto {
  @ApiModelProperty({
    type: 'string',
    description: 'The type of playable',
  })
  type: string;

  @ApiModelProperty({
    type: 'string',
    description: 'The name of the playable',
  })
  name: string;

  @ApiModelProperty({
    type: 'string',
    description: 'The subtype of playable',
  })
  subType?: string;

  @ApiModelProperty({
    type: 'number',
    description: 'The duration of the playable',
  })
  duration: number;

  @ApiModelProperty({
    type: 'number',
    description: 'The cooldown of the playable',
  })
  cooldown: number;

  @ApiModelProperty({
    type: 'number',
    description: 'The score of the playable',
  })
  score: number;

  @ApiModelProperty({
    type: 'array',
    description: 'An array of vertices for the playable',
    items: { type: 'number' },
  })
  vertices: number[];
}
