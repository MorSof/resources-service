import { Bar } from '../bar/models/bar.model';

export class Combo {
  bars: Bar[];

  constructor(partial: Partial<Combo>) {
    Object.assign(this, partial);
  }
}
