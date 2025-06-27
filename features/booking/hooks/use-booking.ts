import { useQuery } from '@tanstack/react-query';
import { bookingService } from '../booking.service';

export function useBooking() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => bookingService.fetchItems(),
  });
}
