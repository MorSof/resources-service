import { Resource } from '../../core/resources/models/resource.model';

export class User {
  id: string;
  name?: string;
  email?: string;
  resources?: Resource[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
