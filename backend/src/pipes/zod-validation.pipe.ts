import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodType } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: error.errors,
      });
    }
  }
}
