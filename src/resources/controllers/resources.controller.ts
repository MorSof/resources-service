import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResourceResponseDto } from '../dtos/resource-response.dto';
import { CreateResourceRequestDto } from '../dtos/create-resource-request.dto';
import { UpdateResourceRequestDto } from '../dtos/update-resource-request.dto';
import { ResourceModel } from '../models/resource.model';
import { ResourcesDtoConverter } from '../services/resources-dto.converter';
import { ResourcesService } from '../services/resources.service';
import { OwnerType } from '../models/owner-type.enum';
import { CollectResourceDto } from '../dtos/collect-resource-request.dto';
import { UseResourceDto } from '../dtos/use-resource-request.dto';

@ApiTags('resources')
@Controller('v1/resources')
export class ResourcesController {
  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly resourcesDtoConverter: ResourcesDtoConverter,
  ) {}

  @ApiOkResponse({
    description: 'The resource created successfully',
    type: ResourceResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiBody({ type: [CreateResourceRequestDto] })
  @Post()
  async create(
    @Body() createResourcesRequestDto: CreateResourceRequestDto[],
  ): Promise<ResourceResponseDto[]> {
    let resourceModels: ResourceModel[] = createResourcesRequestDto.map(
      (resourceDto: CreateResourceRequestDto) =>
        this.resourcesDtoConverter.toModel(resourceDto),
    );

    resourceModels = await this.resourcesService.create(resourceModels);
    return resourceModels.map((resource) =>
      this.resourcesDtoConverter.toDto(resource),
    );
  }

  @ApiOkResponse({
    description: 'The resource updated successfully',
    type: ResourceResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResourceDto: UpdateResourceRequestDto,
  ): Promise<ResourceResponseDto> {
    let resource: ResourceModel =
      this.resourcesDtoConverter.toModel(updateResourceDto);
    resource = await this.resourcesService.update(id, resource);
    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    return this.resourcesDtoConverter.toDto(resource);
  }

  @ApiOkResponse({
    description: 'The resource record',
    type: ResourceResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResourceResponseDto> {
    const resource = await this.resourcesService.findById(id);
    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    return this.resourcesDtoConverter.toDto(resource);
  }

  @ApiOkResponse({
    description: 'The resources records',
    type: ResourceResponseDto,
    isArray: true,
  })
  @ApiQuery({ name: 'owner_id', type: String, required: false })
  @ApiQuery({ name: 'owner_type', type: String, required: false })
  @Get()
  async findByValue(
    @Query('owner_id') ownerId: string,
    @Query('owner_type') ownerType: string,
  ): Promise<ResourceResponseDto[]> {
    const resources: ResourceModel[] = await this.resourcesService.findByValues(
      ownerId,
      OwnerType[ownerType],
    );
    return resources.map((resource) =>
      this.resourcesDtoConverter.toDto(resource),
    );
  }

  @ApiResponse({ status: 200, description: 'Resource deleted successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.resourcesService.delete(id);
  }

  @ApiOkResponse({
    description: 'The resource record',
    type: ResourceResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Put(':id/collect')
  async collect(
    @Param('id', ParseIntPipe) id: number,
    @Body() collectResourceDto: CollectResourceDto,
  ): Promise<ResourceResponseDto> {
    const resource = await this.resourcesService.collect(
      id,
      collectResourceDto.amount,
    );
    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    return this.resourcesDtoConverter.toDto(resource);
  }

  @ApiOkResponse({
    description: 'The resource record',
    type: ResourceResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Put(':id/use')
  async use(
    @Param('id', ParseIntPipe) id: number,
    @Body() useResourceDto: UseResourceDto,
  ): Promise<ResourceResponseDto> {
    const resource = await this.resourcesService.use(id, useResourceDto.amount);
    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    return this.resourcesDtoConverter.toDto(resource);
  }
}
