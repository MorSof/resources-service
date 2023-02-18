import { ResourceTypesEnum } from '../models/resourceTypes.enum';
import { CurrencyNamesEnum } from '../models/currencyNamesEnum';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEnum } from 'class-validator';

export class ResourceResponseDto {
  @ApiModelProperty({
    enum: Object.values(ResourceTypesEnum),
    description: 'The type of the resource',
    required: true,
  })
  type: ResourceTypesEnum;

  @IsEnum(CurrencyNamesEnum)
  @ApiModelProperty({
    enum: [...Object.values(CurrencyNamesEnum)],
    description: 'The name of the resource',
    required: true,
  })
  name: CurrencyNamesEnum;

  @ApiModelProperty({
    type: 'number',
    description: 'The amount of the resource',
  })
  amount: number;

  constructor(partial: Partial<ResourceResponseDto>) {
    Object.assign(this, partial);
  }
}
