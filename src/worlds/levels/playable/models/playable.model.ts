export class Playable {
  type: string;
  subType?: string;
  name: string;
  duration: number;
  cooldown: number;
  vertices: number[];
  score: number;

  constructor(partial: Partial<Playable>) {
    Object.assign(this, partial);
  }
}
