import { ResourceTypesEnum } from './resourceTypes.enum';
import { CurrencyNamesEnum } from './currencyNamesEnum';

export class Resource {
  id?: string;
  type: ResourceTypesEnum;
  name: CurrencyNamesEnum;
  amount: number;
  ownerType?: string;
  ownerId?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<Resource>) {
    Object.assign(this, partial);
  }
}
