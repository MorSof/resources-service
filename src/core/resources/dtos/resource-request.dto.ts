import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ResourceTypesEnum } from '../models/resourceTypes.enum';
import { CurrencyNamesEnum } from '../models/currencyNamesEnum';
import { IsEnum } from 'class-validator';

export class ResourceRequestDto {
  @IsEnum(ResourceTypesEnum)
  @ApiModelProperty({
    enum: Object.values(ResourceTypesEnum),
    description: 'The type of the resource',
  })
  type: ResourceTypesEnum;

  @IsEnum(CurrencyNamesEnum)
  @ApiModelProperty({
    enum: [...Object.values(CurrencyNamesEnum)],
    description: 'The name of the resource',
  })
  name: CurrencyNamesEnum;

  @ApiModelProperty({
    type: 'number',
    description: 'The amount of the resource',
  })
  amount: number;
}
