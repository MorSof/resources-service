import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../db';
import { User } from '../models/user.model';
import { ResourcesEntityConverter } from '../../core/resources/convertes/resources-entity.converter';

@Injectable()
export class UsersEntityConverter {
  constructor(
    private readonly resourcesEntityConverter: ResourcesEntityConverter,
  ) {}

  public convertFrom(userEntity: UserEntity): User {
    const { id, name, email } = userEntity;
    return new User({ id, name, email });
  }

  public convertTo(user: User): UserEntity {
    const { id, name, email } = user;
    return new UserEntity({ id, name, email });
  }
}
