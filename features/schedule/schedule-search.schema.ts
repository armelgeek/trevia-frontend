import { z } from 'zod';

export const searchSchedulesQuerySchema = z.object({
  departureCity: z.string().min(1),
  arrivalCity: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date au format YYYY-MM-DD requise'),
  passengers: z.string().regex(/^\d+$/, 'Nombre de passagers requis'),
  page: z.string().optional(),
  limit: z.string().optional()
});

export const scheduleSearchResultSchema = z.object({
  scheduleId: z.string(),
  tripId: z.string(),
  departure: z.string(),
  arrival: z.string(),
  duration: z.string(),
  distanceKm: z.string(),
  price: z.number(),
  availableSeats: z.number(),
  totalSeats: z.number(),
  vehicleType: z.string().nullable(),
  vehicleModel: z.string().nullable(),
  routeLabel: z.string()
});

export const searchSchedulesResponseSchema = z.object({
  data: z.array(scheduleSearchResultSchema),
  page: z.number(),
  limit: z.number(),
  total: z.number()
});

export type SearchSchedulesQuery = z.infer<typeof searchSchedulesQuerySchema>;
export type ScheduleSearchResult = z.infer<typeof scheduleSearchResultSchema>;
export type SearchSchedulesResponse = z.infer<typeof searchSchedulesResponseSchema>;
