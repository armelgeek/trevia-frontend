import { BaseService } from '@/lib/base-service';
import { API_ENDPOINTS } from '@/shared/config/api';
import { z } from 'zod';

export const scheduleSchema = z.object({
  id: z.string(),
  departure: z.string(),
  arrival: z.string(),
  duration: z.string(),
  price: z.number(),
  availableSeats: z.number(),
  totalSeats: z.number(),
  vehicleType: z.string(),
  stops: z.array(z.string())
});

export const destinationSchedulesSchema = z.object({
  label: z.string(),
  schedules: z.array(scheduleSchema)
});

export const byDateSchedulesSchema = z.array(destinationSchedulesSchema);

export const scheduleByDateService = new BaseService(API_ENDPOINTS.trip.byDate);

export async function fetchSchedulesByDate(date: string) {
  const res = await scheduleByDateService.get('', { date });
  return byDateSchedulesSchema.parse(res);
}
