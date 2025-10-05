import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationsController } from './locations/locations.controller';
import { LocationService } from './locations/locations.service';
import { GeocodingService } from './geocoding/geocoding.services';
import { Location, LocationSchema } from './locations/schemas/location.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/alta'),
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
  ],
  controllers: [AppController, LocationsController],
  providers: [AppService, LocationService, GeocodingService],
})
export class AppModule {}
