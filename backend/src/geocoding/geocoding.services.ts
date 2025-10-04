import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GeocodingService {
  private readonly logger = new Logger(GeocodingService.name);
  private readonly cache = new Map();
  private readonly CACHE_TTL = 10 * 60 * 1000;
  private readonly BASE_URL = 'https://nominatim.openstreetmap.org';
  private getFromCache(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }
  }

  async coordinatesToAddress(lon: number, lat: number): Promise<T> {
    const cacheKey = `coords:${lon}, ${lat}`;
    const cached = this.getFromCache(cacheKey);

    if (cached) return cached;
  }
}
