import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/shared/lib/config/api';

export interface CancelledBooking {
  bookingId: string;
  userName: string;
  tripId: string;
  routeLabel: string;
  bookedAt: string;
  status: string;
}

export function useCancelledBookings() {
  return useQuery<{
    cancelledBookings: CancelledBooking[];
  }>({
    queryKey: ['cancelled-bookings'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/admin/dashboard/cancelled-bookings`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Erreur lors du chargement des réservations annulées');
      return res.json();
    },
  });
}
