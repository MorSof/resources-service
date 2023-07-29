import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseBoolPipe,
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
import { Resource } from '../models/resource.model';
import { ResourcesDtoConverter } from '../services/resources-dto.converter';
import { ResourcesService } from '../services/resources.service';
import { OwnerType } from '../models/owner-type.enum';
import {
  ResourceTransactionDto,
  ResourceTransactionDtoArray,
} from '../dtos/resource-transaction.dto';
import { BaseResourceRequestDto } from '../dtos/base-resource-request.dto';
import { ResourceTransactionDtoConverter } from '../services/resource-transaction-dto.converter';

@ApiTags('resources')
@Controller('v1/resources')
export class ResourcesController {
  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly resourcesDtoConverter: ResourcesDtoConverter,
    private readonly resourceTransactionDtoConverter: ResourceTransactionDtoConverter,
  ) {}

  @ApiOkResponse({
    description: 'The resource created successfully',
    type: ResourceResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiBody({ type: [BaseResourceRequestDto] })
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

  @ApiOkResponse({
    description: 'The resource record',
    type: ResourceResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiQuery({ name: 'fulfillProbability', type: Boolean, required: false })
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

  @ApiOkResponse({
    description: 'The resources records',
    type: ResourceResponseDto,
    isArray: true,
  })
  @ApiQuery({ name: 'fulfillProbability', type: Boolean, required: false })
  @ApiQuery({ name: 'ownerId', type: String, required: false })
  @ApiQuery({ name: 'ownerType', type: String, required: false })
  @ApiQuery({ name: 'groupId', type: String, required: false })
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

  @ApiResponse({ status: 200, description: 'Resource deleted successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.resourcesService.delete(id);
  }

  @ApiResponse({ status: 200, description: 'Resource deleted successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Delete('/owner/:ownerType/:ownerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeByOwnerId(
    @Param('ownerType') ownerType: OwnerType,
    @Param('ownerId') ownerId: string,
  ): Promise<void> {
    return await this.resourcesService.deleteByOwner(ownerType, ownerId);
  }

  @ApiOkResponse({
    description: 'The resource record',
    type: ResourceTransactionDtoArray,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
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

  @ApiOkResponse({
    description: 'The resource record',
    type: ResourceTransactionDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
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

  @ApiOkResponse({
    description: 'The resource updated successfully',
    type: ResourceResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
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
