import { useEntityQuery } from '@/shared/hooks/use-entity-query';
import { BaseService } from '@/shared/lib/services/base-service';
import { API_ENDPOINTS } from '@/shared/config/api';

export interface BookingDistribution {
  type: string;
  routeId: string;
  routeLabel: string;
  count: number;
}

export const bookingDistributionService = new BaseService(API_ENDPOINTS.dashboard.bookingDistribution);

export function useBookingDistribution(params?: Record<string, unknown>) {
  return useEntityQuery<BookingDistribution[]>({
    service: bookingDistributionService,
    queryKey: ['booking-distribution'],
    params,
  });
}
