import { Stats } from './stats.model';
import { Goal } from '../goals/models/goal.model';
import { Combo } from '../combo/models/combo.model';
import { Playable } from '../playable/models/playable.model';

export class Level {
  id: number;
  playables: Playable[];
  lives: number;
  combo: Combo;
  worldId: number;
  stats?: Stats;
  goals: Goal[];

  constructor(partial: Partial<Level>) {
    Object.assign(this, partial);
    if (partial.stats) {
      return;
    }
    this.stats = this.playables.reduce((stats, playable) => {
      const countByName = stats.playables.countByName;
      if (countByName[playable.name]) {
        countByName[playable.name] = countByName[playable.name] + 1;
      } else {
        countByName[playable.name] = 1;
      }
      stats.playables.total++;
      return stats;
    }, new Stats());
  }
}
