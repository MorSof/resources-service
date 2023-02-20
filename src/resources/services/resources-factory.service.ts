import { Injectable } from '@nestjs/common';
import { Resource } from '../models/resource.model';

@Injectable()
export abstract class ResourcesFactory {
  abstract create(name: string): Resource;
}
