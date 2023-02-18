import { BadRequestException, Injectable } from '@nestjs/common';
import { Resource } from '../models/resource.model';
import { ResourceRequestDto } from '../dtos/resource-request.dto';
import { ResourceResponseDto } from '../dtos/resource-response.dto';
import { ResourceTypesEnum } from '../models/resourceTypes.enum';
import { CurrencyNamesEnum } from '../models/currencyNamesEnum';

@Injectable()
export class ResourcesDtoConverter {
  public convertFrom(resourceRequestDto: ResourceRequestDto): Resource {
    const { name, amount, type } = resourceRequestDto;
    if (
      type == ResourceTypesEnum.CURRENCY &&
      Object.values(CurrencyNamesEnum).includes(name as CurrencyNamesEnum)
    ) {
      return new Resource({
        name,
        amount,
        type,
      });
    }
    throw new BadRequestException(
      `unsupported resource ${JSON.stringify(resourceRequestDto)}`,
    );
  }

  public convertTo(resource: Resource): ResourceResponseDto {
    const { name, amount, type } = resource;
    return new ResourceResponseDto({ name, amount, type });
  }
}
