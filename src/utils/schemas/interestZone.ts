import { z } from 'zod';

export const interestZoneSchema = z.object({
  description: z.string().optional(),
  name: z.string().min(1, 'Name field is required'),
  priority: z.enum(['unset', 'low', 'medium', 'high']),
});
