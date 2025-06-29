import { useEntityQuery } from '@/shared/hooks/use-entity-query';
import { cancelledBookingsService } from '../dashboard.services';

export function useCancelledBookings(params?: Record<string, unknown>) {
  return useEntityQuery({
    service: cancelledBookingsService,
    queryKey: ['cancelled-bookings'],
    params,
  });
}
