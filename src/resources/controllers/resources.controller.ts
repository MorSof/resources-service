import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from '../models/resource.model';
import { ResourcesDtoConverter } from '../services/resources-dto.converter';
import { ResourcesService } from '../services/resources.service';
import { OwnerType } from '../models/owner-type.enum';
import { ResourceTransactionDtoConverter } from '../services/resource-transaction-dto.converter';
import {
  BaseResourceRequestDto,
  ResourceResponseDto,
  ResourceTransactionDto,
  ResourceTransactionDtoArray,
} from '../../api/build';

@ApiTags('resources')
@Controller('v1/resources')
export class ResourcesController {
  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly resourcesDtoConverter: ResourcesDtoConverter,
    private readonly resourceTransactionDtoConverter: ResourceTransactionDtoConverter,
  ) {}

  @Post()
  async create(
    @Body() createResourcesRequestDto: BaseResourceRequestDto[],
  ): Promise<ResourceResponseDto[]> {
    let resourceModels: Resource[] = createResourcesRequestDto.map(
      (resourceDto: BaseResourceRequestDto) =>
        this.resourcesDtoConverter.toModel(resourceDto),
    );

    resourceModels = await this.resourcesService.create(resourceModels);
    return resourceModels.map((resource) =>
      this.resourcesDtoConverter.toDto(resource),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('fulfillProbability', new DefaultValuePipe(false), ParseBoolPipe)
    fulfillProbability: boolean,
  ): Promise<ResourceResponseDto> {
    const resource = await this.resourcesService.findById(
      id,
      fulfillProbability,
    );
    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    return this.resourcesDtoConverter.toDto(resource);
  }

  @Get()
  async findByValue(
    @Query('ownerId') ownerId: string,
    @Query('ownerType') ownerType: string,
    @Query('groupId') groupId: string,
    @Query('fulfillProbability', new DefaultValuePipe(false), ParseBoolPipe)
    fulfillProbability: boolean,
  ): Promise<ResourceResponseDto[]> {
    const resources: Resource[] = await this.resourcesService.findByValues(
      ownerId,
      OwnerType[ownerType],
      groupId,
      fulfillProbability,
    );
    return resources.map((resource) =>
      this.resourcesDtoConverter.toDto(resource),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.resourcesService.delete(id);
  }

  @Delete('/owner/:ownerType/:ownerId')
  async removeByOwnerId(
    @Param('ownerType') ownerType: OwnerType,
    @Param('ownerId') ownerId: string,
  ): Promise<void> {
    return await this.resourcesService.deleteByOwner(ownerType, ownerId);
  }

  @Put('/collect')
  async collect(
    @Body() resourceTransactionDtoArrays: ResourceTransactionDtoArray,
  ): Promise<ResourceTransactionDtoArray> {
    let resources = resourceTransactionDtoArrays.resources.map((dto) =>
      this.resourceTransactionDtoConverter.toModel(dto),
    );
    resources = await this.resourcesService.collect(resources);
    return {
      resources: resources.map((resource) =>
        this.resourceTransactionDtoConverter.toDto(resource),
      ),
    };
  }

  @Put(':id/use')
  async use(
    @Param('id', ParseIntPipe) id: number,
    @Body() useResourceDto: ResourceTransactionDto,
  ): Promise<ResourceTransactionDto> {
    const resource = await this.resourcesService.use(id, useResourceDto.amount);
    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    return this.resourceTransactionDtoConverter.toDto(resource);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResourceDto: BaseResourceRequestDto,
  ): Promise<ResourceResponseDto> {
    let resource: Resource =
      this.resourcesDtoConverter.toModel(updateResourceDto);
    resource = await this.resourcesService.update(id, resource);
    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    return this.resourcesDtoConverter.toDto(resource);
  }
}
