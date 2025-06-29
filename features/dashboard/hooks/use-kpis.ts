import { API_URL } from '@/shared/lib/config/api';
import { useQuery } from '@tanstack/react-query';

export function useKpis(period: 'day' | 'month' | 'year') {
  return useQuery({
    queryKey: ['dashboard', 'kpis', period],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/admin/dashboard?period=${period}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Erreur chargement KPIs');
      return res.json();
    },
  });
}
