import { useEntityQuery } from '@/shared/hooks/use-entity-query';
import { lowOccupancyTripsService } from '../dashboard.services';

export function useLowOccupancyTrips(params?: Record<string, unknown>) {
  return useEntityQuery({
    service: lowOccupancyTripsService,
    queryKey: ['low-occupancy-trips'],
    params,
  });
}
