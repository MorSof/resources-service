import { BarResponseDto } from '../bar/dtos/bar-response.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ComboResponseDto {
  @ApiModelProperty({
    type: BarResponseDto,
    description: 'The bars of the combo',
    isArray: true,
    required: true,
  })
  bars: BarResponseDto[];

  constructor(partial: Partial<ComboResponseDto>) {
    Object.assign(this, partial);
  }
}
