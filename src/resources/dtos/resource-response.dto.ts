import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ResourceResponseDto {
  @ApiModelProperty({
    type: 'string',
    description: 'The id of the resource',
    required: true,
  })
  id: string;

  @ApiModelProperty({
    type: 'string',
    description: 'The name of the resource',
    required: true,
  })
  name: string;

  @ApiModelProperty({
    type: 'string',
    description: 'The email of the resource',
    required: true,
  })
  email: string;

  @ApiModelProperty({
    type: ResourceResponseDto,
    description: 'The storage of the resource',
    isArray: true,
    required: true,
  })
  storage?: ResourceResponseDto[];

  constructor(partial: Partial<ResourceResponseDto>) {
    Object.assign(this, partial);
  }
}
