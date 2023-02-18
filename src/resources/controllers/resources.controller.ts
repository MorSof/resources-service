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
  ApiBadRequestResponse, ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResourceResponseDto } from '../dtos/resource-response.dto';
import { CreateResourceRequestDto } from '../dtos/create-resource-request.dto';
import { UpdateResourceRequestDto } from '../dtos/update-resource-request.dto';
import { ResourceModel } from '../models/resource.model';
import { ResourcesDtoConverter } from '../services/resources-dto.converter';
import { ResourcesService } from '../services/resources.service';
import { BelongType } from '../models/belong-type.enum';

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
    return resource;
  }

  @ApiOkResponse({
    description: 'The resource record',
    type: ResourceResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('fulfill_probability') fulfillProbability: boolean,
  ): Promise<ResourceResponseDto> {
    const resource = await this.resourcesService.findById(
      id,
      fulfillProbability,
    );
    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    return resource;
  }

  @ApiOkResponse({
    description: 'The resources records',
    type: ResourceResponseDto,
    isArray: true,
  })
  @Get()
  async findByValue(
    @Query('belong_id', ParseIntPipe) belongId: number,
    @Query('belong_type') belongType: string,
    @Query('fulfill_probability') fulfillProbability: boolean,
  ): Promise<ResourceResponseDto[]> {
    return this.resourcesService.findByValues(
      belongId.toString(),
      BelongType[belongType],
      fulfillProbability,
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
    @Body('amount') amount: number,
  ): Promise<ResourceResponseDto> {
    const resource = await this.resourcesService.collect(id, amount);
    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    return resource;
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
    @Body('amount') amount: number,
  ): Promise<ResourceResponseDto> {
    const resource = await this.resourcesService.use(id, amount);
    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    return resource;
  }
}
