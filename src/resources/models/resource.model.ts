import { ResourceType } from './resource-type.enum';
import { OwnerType } from './owner-type.enum';
import { ResourcesNames } from './resources-names.enum';

export abstract class Resource {
  id: number;
  ownerId: string;
  ownerType: OwnerType;
  type: ResourceType;
  name: ResourcesNames;
  amount: number | null;
  receivingProbability: number | null;
  rarenessProbability: number | null;
  extraArgs: any | null;
  updatedAt: Date;
  createdAt: Date;
  abstract fulfillProbability(): void;
}
