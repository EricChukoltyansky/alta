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




