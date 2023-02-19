import { ResourceType } from './resource-type.enum';
import { OwnerType } from './owner-type.enum';

export class ResourceModel {
  id: number;
  ownerId: string;
  ownerType: OwnerType;
  type: ResourceType;
  name: string;
  amount: number | null;
  receivingProbability: number | null;
  rarenessProbability: number | null;
  extraArgs: any | null;
  updatedAt: Date;
  createdAt: Date;
}
