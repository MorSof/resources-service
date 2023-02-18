export class Stats {
  playables: {
    countByName: object;
    total: number;
  };

  constructor() {
    this.playables = {
      countByName: {},
      total: 0,
    };
  }
}
