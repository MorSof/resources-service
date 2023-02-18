import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEmail, IsOptional } from 'class-validator';

export class ResourceRequestDto {
  @ApiModelProperty({
    type: 'string',
    description: 'The name of the resource',
    required: false,
  })
  name: string;

  @IsEmail()
  @IsOptional()
  @ApiModelProperty({
    type: 'string',
    description: 'The email of the resource',
    required: false,
  })
  email: string;
}
