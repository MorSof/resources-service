import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResourceRequestDto } from '../dtos/resource-request.dto';
import { ResourcesService } from '../services/resources.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Resource } from '../models/resource.model';
import { ResourceResponseDto } from '../dtos/resource-response.dto';
import { ResourcesDtoConverter } from '../services/resources-dto.converter';

@ApiTags('resources')
@Controller('resources')
export class ResourcesController {
  constructor(
    private readonly resourceService: ResourcesService,
    private readonly resourcesDtoConverter: ResourcesDtoConverter,
  ) {}

  @ApiOkResponse({
    description: 'The resource records',
    type: ResourceResponseDto,
    isArray: true,
  })
  @Get()
  async findUAllResources(): Promise<ResourceResponseDto[]> {
    const resources: Resource[] = await this.resourceService.findAllResources();
    return resources.map((resource) =>
      this.resourcesDtoConverter.convertTo(resource),
    );
  }

  @ApiOkResponse({
    description: 'The resource record',
    type: ResourceResponseDto,
  })
  @Get(':id')
  async findResourcesById(@Param('id') id: string): Promise<ResourceResponseDto> {
    const resource: Resource = await this.resourceService.findResourcesById(id);
    return this.resourcesDtoConverter.convertTo(resource);
  }

  @ApiOkResponse({
    description: 'The resource records',
    type: ResourceResponseDto,
  })
  @Post()
  @UsePipes(ValidationPipe)
  async createResources(
    @Body() createResourceDto: ResourceRequestDto,
  ): Promise<ResourceResponseDto> {
    const resource: Resource =
      this.resourcesDtoConverter.convertFrom(createResourceDto);
    return this.resourcesDtoConverter.convertTo(
      await this.resourceService.createResource(resource),
    );
  }
}
