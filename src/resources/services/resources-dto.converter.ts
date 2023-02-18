import { Injectable } from '@nestjs/common';
import { ResourceRequestDto } from '../dtos/resource-request.dto';
import { Resource } from '../models/resource.model';
import { ResourceResponseDto } from '../dtos/resource-response.dto';

@Injectable()
export class ResourcesDtoConverter {
  public convertFrom(resourceRequestDto: ResourceRequestDto): Resource {
    const { name, email } = resourceRequestDto;
    return new Resource({ name, email });
  }

  public convertTo(resource: Resource): ResourceResponseDto {
    const { id, name, email } = resource;
    return new ResourceResponseDto({
      id,
      name,
      email,
    });
  }
}
