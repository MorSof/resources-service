export class Resource {
  id: string;
  name?: string;
  email?: string;

  constructor(partial: Partial<Resource>) {
    Object.assign(this, partial);
  }
}
