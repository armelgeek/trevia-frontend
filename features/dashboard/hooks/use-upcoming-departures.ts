import { API_URL } from '@/shared/lib/config/api';
import { useQuery } from '@tanstack/react-query';

export function useUpcomingDepartures(period: 'day' | 'month' | 'year') {
  return useQuery({
    queryKey: ['dashboard', 'upcoming-departures', period],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/admin/dashboard/upcoming-departures?period=${period}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Erreur chargement départs');
      return res.json();
    },
  });
}
