import { useQuery } from '@tanstack/react-query';
import { userBookingService } from '../booking-user.service';

export function useUserBookings(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['user-bookings', params],
    queryFn: async () => {
      const data = await userBookingService.list(params);
      return data;
    },
  });
}
