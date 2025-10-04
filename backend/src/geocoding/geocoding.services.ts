import {Injectable, Logger} from "@nestjs/common"

@Injectable()
export class GeocodingService {
    private readonly logger = new Logger(GeocodingService.name)
    private readonly cache = new Map>();
    private readonly CACHE_TTL = 10*60*1000;
    private readonly BASE_URL = 'https://nominatim.openstreetmap.org';

    
}