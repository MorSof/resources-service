import { Resource } from '../../../../../core/resources/models/resource.model';

export class Bar {
  goal: number;
  rewards: Resource[];

  constructor(partial: Partial<Bar>) {
    Object.assign(this, partial);
  }
}
