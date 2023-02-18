import { Injectable } from '@nestjs/common';
import { Resource } from '../models/resource.model';
import { ResourceEntity } from '../entities/resource.entity';

@Injectable()
export class ResourcesEntityConverter {
  public convertFrom(resourceEntity: ResourceEntity): Resource {
    const { id, name, email } = resourceEntity;
    return new Resource({ id, name, email });
  }

  public convertTo(resource: Resource): ResourceEntity {
    const { id, name, email } = resource;
    return new ResourceEntity({ id, name, email });
  }
}
