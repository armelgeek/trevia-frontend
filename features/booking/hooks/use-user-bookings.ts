import { useQuery } from '@tanstack/react-query';
import { userBookingService } from '../booking-user.service';
import { bookingListSchema } from '../booking-user.schema';

export function useUserBookings(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['user-bookings', params],
    queryFn: async () => {
      const data = await userBookingService.list(params);
      // Validation Zod côté client (optionnel mais sûr)
      return bookingListSchema.parse(data);
    },
  });
}
