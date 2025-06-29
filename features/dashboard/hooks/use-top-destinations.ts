import { API_URL } from '@/shared/lib/config/api';
import { useQuery } from '@tanstack/react-query';

export function useTopDestinations(period: 'day' | 'month' | 'year') {
  return useQuery({
    queryKey: ['dashboard', 'top-destinations', period],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/admin/dashboard/top-destinations?period=${period}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Erreur chargement top destinations');
      return res.json();
    },
  });
}
