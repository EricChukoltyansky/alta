import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LocationService } from './locations.service';
import {
  CreateLocationDto,
  UpdateLocationDto,
  QueryLocationsDto,
  CreateLocationSchema,
  UpdateLocationSchema,
  QueryLocationSchema,
} from './dto/create-locations.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateLocationSchema))
  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({ status: 201, description: 'Location created successfully' })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  @UsePipes(new ZodValidationPipe(QueryLocationSchema))
  @ApiOperation({ summary: 'Get all locations with pagination' })
  findAll(@Query() query: QueryLocationsDto) {
    return this.locationsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a location by ID' })
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }
}
