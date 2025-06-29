import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/shared/lib/config/api';

export interface BookingDistribution {
  type: string;
  routeId: string;
  routeLabel: string;
  count: number;
}

export function useBookingDistribution() {
  return useQuery<{
    bookingDistribution: BookingDistribution[];
  }>({
    queryKey: ['booking-distribution'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/admin/dashboard/booking-distribution`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Erreur lors du chargement de la répartition des réservations');
      return res.json();
    },
  });
}
