import { Resource } from '../../resources/models/resource.model';

export class BlackHoles extends Resource {
  duration: number;
  vertices: number[];

  fulfillProbability(): void {
    return undefined;
  }
}
