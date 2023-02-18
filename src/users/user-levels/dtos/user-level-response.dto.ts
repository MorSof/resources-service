import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserLevelResponseDto {
  @ApiModelProperty({
    type: 'number',
    description: 'The id of the user-levels relationship',
    required: true,
  })
  id: number;

  @ApiModelProperty({
    type: 'string',
    description: 'The amount of stars the user achieved in the level',
    required: true,
  })
  stars: number;

  @ApiModelProperty({
    type: 'string',
    description: 'The id of the user',
    required: true,
  })
  userId: string;

  @ApiModelProperty({
    type: 'string',
    description: 'The id of the level that the user finished',
    required: true,
  })
  levelId: number;

  constructor(partial: Partial<UserLevelResponseDto>) {
    Object.assign(this, partial);
  }
}
