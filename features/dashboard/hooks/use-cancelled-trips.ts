import { useEntityQuery } from '@/shared/hooks/use-entity-query';
import { cancelledTripsService } from '../dashboard.services';

export function useCancelledTrips(params?: Record<string, unknown>) {
  return useEntityQuery({
    service: cancelledTripsService,
    queryKey: ['cancelled-trips'],
    params,
  });
}
