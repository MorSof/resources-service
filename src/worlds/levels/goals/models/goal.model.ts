import { Resource } from '../../../../core/resources/models/resource.model';

export class Goal {
  score: number;
  rewards: Resource[];

  constructor(partial: Partial<Goal>) {
    Object.assign(this, partial);
  }
}
