import { ResourceType } from './resource-type.enum';
import { BelongType } from './belong-type.enum';

export class ResourceModel {
  id: number;
  belongId: string;
  belongType: BelongType;
  type: ResourceType;
  name: string;
  amount: number | null;
  receivingProbability: number | null;
  rarenessProbability: number | null;
  extraArgs: any | null;
  updatedAt: Date;
  createdAt: Date;
}
