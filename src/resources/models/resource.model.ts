import { OwnerType } from './owner-type.enum';

export abstract class Resource {
  id: number;
  ownerId: string;
  ownerType: OwnerType;
  groupId?: string;
  type: string;
  name: string;
  amount: number | null;
  receivingProbability: number | null;
  rarenessProbability: number | null;
  extraArgs: any | null;
  updatedAt: Date;
  createdAt: Date;
  abstract fulfillProbability(): void;
}
