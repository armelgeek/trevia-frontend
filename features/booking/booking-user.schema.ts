import { z } from "zod";

export const bookingSummarySchema = z.object({
  bookingId: z.string(),
  tripId: z.string(),
  routeLabel: z.string(),
  bookedAt: z.string(),
  status: z.string(),
});

export const listBookingsQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
});

export const bookingListSchema = z.object({
  data: z.array(bookingSummarySchema),
  page: z.number(),
  limit: z.number(),
  total: z.number(),
});

export type BookingSummary = z.infer<typeof bookingSummarySchema>;
export type BookingList = z.infer<typeof bookingListSchema>;
