import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRequestDto } from '../dtos/user-request.dto';
import { UsersService } from '../services/users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../models/user.model';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UsersDtoConverter } from '../services/users-dto.converter';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly usersDtoConverter: UsersDtoConverter,
  ) {}

  @ApiOkResponse({
    description: 'The user records',
    type: UserResponseDto,
    isArray: true,
  })
  @Get()
  async findUAllUsers(): Promise<UserResponseDto[]> {
    const users: User[] = await this.userService.findAllUsers();
    return users.map((user) => this.usersDtoConverter.convertTo(user));
  }

  @ApiOkResponse({
    description: 'The user record',
    type: UserResponseDto,
  })
  @Get(':id')
  async findUsersById(@Param('id') id: string): Promise<UserResponseDto> {
    const user: User = await this.userService.findUsersById(id);
    return this.usersDtoConverter.convertTo(user);
  }

  @ApiOkResponse({
    description: 'The user records',
    type: UserResponseDto,
  })
  @Post()
  @UsePipes(ValidationPipe)
  async createUsers(
    @Body() createUserDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    const user: User = this.usersDtoConverter.convertFrom(createUserDto);
    return this.usersDtoConverter.convertTo(
      await this.userService.createUser(user),
    );
  }

  @ApiOkResponse({
    description: 'The user storage',
    type: UserResponseDto,
  })
  @Get(':id/storage')
  async getUserStorage(@Param('id') id: string): Promise<UserResponseDto> {
    const user: User = await this.userService.getUserStorage(id);
    return this.usersDtoConverter.convertTo(user);
  }
}
