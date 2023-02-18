import { Level } from '../levels/models/level.model';

export class World {
  id: number;
  name: string;
  levels: Level[];

  constructor(partial: Partial<World>) {
    Object.assign(this, partial);
  }
}
