import { Resource } from '../../resources/models/resource.model';

export class BlackHoles extends Resource {
  fulfillProbability(): void {
    this.extraArgs = this.extraArgs || {};
    if (
      this.amount == null &&
      this.receivingProbability &&
      this.rarenessProbability
    ) {
      const randomNumber: number = Math.floor(Math.random() * 100) + 1;
      if (randomNumber <= this.receivingProbability * 100) {
        this.fulfillVertices();
        this.fulfillDuration();
      }
    }
  }

  private fulfillVertices() {
    let numOfPotentialVertices = Math.floor(
      (Math.floor(Math.random() * 8) + 1) * this.rarenessProbability,
    );
    if (numOfPotentialVertices === 0) {
      numOfPotentialVertices = 1;
    }
    const verticesSet = new Set<number>();
    for (let i = 0; i < numOfPotentialVertices; i++) {
      const vertex = Math.floor(Math.random() * 8) + 1;
      verticesSet.add(vertex);
    }
    this.extraArgs.vertices = Array.from(verticesSet);
  }

  private fulfillDuration() {
    const potentialDurationTime: number = Math.floor(Math.random() * 7) + 3;
    const durationTime = Math.floor(
      potentialDurationTime * (this.rarenessProbability + 1),
    );
    this.extraArgs.duration = durationTime;
  }
}
