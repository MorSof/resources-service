import { Resource } from '../../resources/models/resource.model';

export class Coins extends Resource {
  constructor() {
    super();
  }

  fulfillProbability(): void {
    if (
      this.amount == null &&
      this.receivingProbability &&
      this.rarenessProbability
    ) {
      const randomNumber: number = Math.floor(Math.random() * 100) + 1;
      if (randomNumber <= this.receivingProbability * 100) {
        const mustHaveAmount = this.rarenessProbability * 10;
        this.amount = Math.floor(
          mustHaveAmount + mustHaveAmount * randomNumber * 10,
        );
      }
    }
  }
}
