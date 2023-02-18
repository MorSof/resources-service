import { LevelResponseDto } from '../levels/dtos/level-response.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class WorldResponseDto {
  @ApiModelProperty({
    type: 'number',
    description: 'The id of the world',
    required: true,
  })
  id: number;

  @ApiModelProperty({
    type: 'string',
    description: 'The name of the world',
    required: true,
  })
  name: string;

  @ApiModelProperty({
    type: LevelResponseDto,
    description: 'The levels of the world',
    isArray: true,
    required: true,
  })
  levels: LevelResponseDto[];

  constructor(partial: Partial<WorldResponseDto>) {
    Object.assign(this, partial);
  }
}
