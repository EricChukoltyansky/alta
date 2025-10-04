import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from './schemas/location.schema';
import {
  CreateLocationDto,
  UpdateLocationDto,
  QueryLocationsDto,
} from './dto/create-locations.dto';
import { GeocodingService } from 'src/geocoding/geocoding.services';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
    private geocodingService: GeocodingService<any>,
  ) {}

  async create(createDto: CreateLocationDto) {
    //   Create default address if not provided
    if (!createDto.address) {
      const address = await this.geocodingService.coordinatesToAddress(
        createDto.coordinates.lon,
        createDto.coordinates.lat,
      );

      if (address) {
        createDto.address = address;
      }
    }

    const location = new this.locationModel(createDto);
    return location.save();
  }

  async findAll(query: QueryLocationsDto) {
    const { page = 1, limit = 10, search, category, tags } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (tags && tags.length > 0) {
      filter.tags = { $in: tags };
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const [data, total] = await Promise.all([
      this.locationModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.locationModel.countDocuments(filter),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
