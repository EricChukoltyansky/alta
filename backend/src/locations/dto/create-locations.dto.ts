import { z } from 'zod';

export const CreateLocationSchema = z.object({
  name: z.string().min(2).max(60),
  category: z.enum(['office', 'store', 'landmark']),
  coordinates: z.object({
    lon: z.number().min(-180).max(180),
    lat: z.number().min(-90).max(90),
  }),
  address: z.string().max(120).optional(),
  notes: z.string().max(500).optional(),
});

export type CreateLocationDto = z.infer<typeof CreateLocationSchema>;
export type UpdateLocationDto = z.infer<typeof CreateLocationSchema>;
export type QueryLocationDto = z.infer<typeof QueryLocationSchema>;

export const UpdateLocationSchema = CreateLocationSchema.partial();

export const QueryLocationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  category: z.enum(['office', 'store', 'landmark']),
});
