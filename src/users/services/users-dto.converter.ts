import { Injectable } from '@nestjs/common';
import { UserRequestDto } from '../dtos/user-request.dto';
import { User } from '../models/user.model';
import { UserResponseDto } from '../dtos/user-response.dto';
import { ResourcesDtoConverter } from '../../core/resources/convertes/resources-dto.converter';
import { ResourceResponseDto } from '../../core/resources/dtos/resource-response.dto';

@Injectable()
export class UsersDtoConverter {
  constructor(private readonly resourcesDtoConverter: ResourcesDtoConverter) {}

  public convertFrom(userRequestDto: UserRequestDto): User {
    const { name, email } = userRequestDto;
    return new User({ name, email });
  }

  public convertTo(user: User): UserResponseDto {
    const { id, name, email, resources } = user;
    const resourceResponseDto: ResourceResponseDto[] = resources?.map(
      (resource) => this.resourcesDtoConverter.convertTo(resource),
    );
    return new UserResponseDto({
      id,
      name,
      email,
      storage: resourceResponseDto,
    });
  }
}
