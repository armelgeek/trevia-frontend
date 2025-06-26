import { z } from 'zod';

export const bookingSchema = z.object({
  id: z.string(),
  user: z.object({ id: z.string(), name: z.string() }),
  trip: z.object({ id: z.string(), name: z.string() }),
  status: z.string(),
  createdAt: z.string(),
});

export type Booking = z.infer<typeof bookingSchema>;
