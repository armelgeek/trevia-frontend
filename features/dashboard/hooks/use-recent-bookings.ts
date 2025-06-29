import { API_URL } from '@/shared/lib/config/api';
import { useQuery } from '@tanstack/react-query';

export function useRecentBookings(period: 'day' | 'month' | 'year') {
  return useQuery({
    queryKey: ['dashboard', 'recent-bookings', period],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/admin/dashboard/recent-bookings?period=${period}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Erreur chargement réservations');
      return res.json();
    },
  });
}
