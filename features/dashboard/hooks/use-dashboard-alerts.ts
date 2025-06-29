import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/shared/lib/config/api';

export function useDashboardAlerts() {
  return useQuery<{
    alerts: string[];
  }>({
    queryKey: ['dashboard-alerts'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/admin/dashboard/alerts`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Erreur lors du chargement des alertes');
      return res.json();
    },
  });
}
