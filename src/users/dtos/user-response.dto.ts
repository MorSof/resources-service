import { ResourceResponseDto } from '../../core/resources/dtos/resource-response.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserResponseDto {
  @ApiModelProperty({
    type: 'string',
    description: 'The id of the user',
    required: true,
  })
  id: string;

  @ApiModelProperty({
    type: 'string',
    description: 'The name of the user',
    required: true,
  })
  name: string;

  @ApiModelProperty({
    type: 'string',
    description: 'The email of the user',
    required: true,
  })
  email: string;

  @ApiModelProperty({
    type: ResourceResponseDto,
    description: 'The storage of the user',
    isArray: true,
    required: true,
  })
  storage?: ResourceResponseDto[];

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
