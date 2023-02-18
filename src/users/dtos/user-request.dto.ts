import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEmail, IsOptional } from 'class-validator';

export class UserRequestDto {
  @ApiModelProperty({
    type: 'string',
    description: 'The name of the user',
    required: false,
  })
  name: string;

  @IsEmail()
  @IsOptional()
  @ApiModelProperty({
    type: 'string',
    description: 'The email of the user',
    required: false,
  })
  email: string;
}
