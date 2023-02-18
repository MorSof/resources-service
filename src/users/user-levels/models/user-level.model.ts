export class UserLevel {
  id?: number;
  stars: number;
  userId: string;
  levelId: number;

  constructor(partial: Partial<UserLevel>) {
    Object.assign(this, partial);
  }
}
