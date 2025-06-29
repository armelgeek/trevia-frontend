import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/shared/lib/config/api';

export interface CancelledTrip {
  tripId: string;
  routeLabel: string;
  departureDate: string;
  status: string;
}

export function useCancelledTrips() {
  return useQuery<{
    cancelledTrips: CancelledTrip[];
  }>({
    queryKey: ['cancelled-trips'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/admin/dashboard/cancelled-trips`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Erreur lors du chargement des voyages annulés');
      return res.json();
    },
  });
}
