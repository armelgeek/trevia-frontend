import { API_URL } from '@/shared/lib/config/api';
import { useQuery } from '@tanstack/react-query';

export interface CancelledDeparture {
  scheduleId: string;
  routeLabel: string;
  departureTime: string;
  reason: string;
}

export function useCancelledDepartures() {
  return useQuery<{
    cancelledDepartures: CancelledDeparture[];
  }>({
    queryKey: ['cancelled-departures'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/admin/dashboard/cancelled-departures`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Erreur lors du chargement des voyages annulés');
      return res.json();
    },
  });
}
