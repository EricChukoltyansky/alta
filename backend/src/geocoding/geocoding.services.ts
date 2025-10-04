import { Injectable, Logger } from '@nestjs/common';

interface CacheEntry {
    data: T;
}

@Injectable()
export class GeocodingService<T> {
  private readonly logger = new Logger(GeocodingService.name);
  private readonly cache = new Map<string, { value: T; timestamp: number }>();
  private readonly CACHE_TTL = 10 * 60 * 1000;
  private readonly BASE_URL = 'https://nominatim.openstreetmap.org';
  private getFromCache(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }
  private setCache(key: string, data: T): void {
    this.cache.set(key, { value: data, timestamp: Date.now() });
  }

  async coordinatesToAddress(
    lon: number,
    lat: number,
  ): Promise<T | undefined | null> {
    const cacheKey = `coords:${lon}, ${lat}`;
    const cached = this.getFromCache(cacheKey);

    if (cached) return cached;

    try {
      const response = await fetch(
        `${this.BASE_URL}/reverse?format=json&lon=${lon}&lat=${lat}`,
        {
          headers: { 'User-Agent': 'LocationManager/1.0' },
          signal: AbortSignal.timeout(5000),
        },
      );

      if (!response.ok) {
        this.logger.warn(`Reverse geocoding failed: ${response.status}`);
        return null;
      }

      const data = await response.json();
      const address = data.display_name || null;

      if (address) {
        this.setCache(cacheKey, address);
      }

      return address;
    } catch (error) {
      this.logger.error('Reverse geocoding error', error);
      return null;
    }
  }

  async addressToCoordinates(
    address: string,
  ): Promise<{ lon: number; lat: number } | null> {
    const cacheKey = `address:${address}`;
    const cached = this.getFromCache(cacheKey) as {
      lon: number;
      lat: number;
    } | null;

    if (cached) return cached;

    try {
      const response = await fetch(
        `${this.BASE_URL}/search?format=json&q=${encodeURIComponent(address)}`,
        {
          headers: { 'User-Agent': 'LocationManager/1.0' },
          signal: AbortSignal.timeout(5000),
        },
      );

      if (!response.ok) {
        this.logger.warn(`Forward geocoding failed: ${response.status}`);
        return null;
      }

      const data = await response.json();
      if (!data || data.length === 0) {
        return null;
      }

      const coordinates = {
        lon: parseFloat(data[0].lon),
        lat: parseFloat(data[0].lat),
      };

      this.setCache(cacheKey, coordinates as T);
      return coordinates;
    } catch (error) {
      this.logger.error('Forward geocoding error', error);
      return null;
    }
  }
}
