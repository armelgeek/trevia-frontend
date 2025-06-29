import { useEntityQuery } from '@/shared/hooks/use-entity-query';
import { recentBookingsService } from '../dashboard.services';

export interface RecentBooking {
  bookingId: string;
  userName: string;
  tripId: string;
  routeLabel: string;
  bookedAt: string;
  status: string;
}

export interface RecentBookingsResult {
  recentBookings: RecentBooking[];
}

export function useRecentBookings(params?: Record<string, unknown>) {
  return useEntityQuery<RecentBookingsResult>({
    service: recentBookingsService,
    queryKey: ['dashboard', 'recent-bookings', params?.period],
    params,
  });
}
