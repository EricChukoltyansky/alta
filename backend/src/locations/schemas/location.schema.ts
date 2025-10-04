import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Location {
  @Prop({ required: true, minLength: 2, maxLength: 60 })
  name: string;

  @Prop({ required: true, enum: ['office', 'store', 'landmark'] })
  category: string;

  @Prop({
    type: {
      lon: { type: Number, required: true, min: -180, max: 180 },
      lat: { type: Number, required: true, min: -90, max: 90 },
    },
    required: true,
    index: '2dsphere',
  })
  coordinates: {
    lon: number;
    lat: number;``
  };

  @Prop({ maxLength: 120 })
  address?: string;

  @Prop({ maxLength: 500 })
  notes?: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);

LocationSchema.index({ name: 'text' });
LocationSchema.index({ category: 1 });
