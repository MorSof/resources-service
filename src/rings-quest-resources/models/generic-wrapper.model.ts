import { Resource } from '../../resources/models/resource.model';

export class GenericWrapper extends Resource {
  fulfillProbability(): void {
    if (
      this.amount == null &&
      this.receivingProbability &&
      this.rarenessProbability
    ) {
      const randomNumber: number = Math.floor(Math.random() * 100) + 1;
      if (randomNumber <= this.receivingProbability * 100) {
        this.amount = 1;
      }
    }
  }
}
