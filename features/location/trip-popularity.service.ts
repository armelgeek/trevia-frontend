import { BaseService } from '@/lib/base-service';
import { API_ENDPOINTS } from '@/shared/config/api';
import { tripPopularityListSchema } from './trip-popularity.schema';

export const tripPopularityService = new BaseService(API_ENDPOINTS.trip.popular());

export async function fetchPopularTrips(params?: Record<string, string>) {
  const res = await tripPopularityService.get('', params);
  return tripPopularityListSchema.parse(res);
}
