import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/shared/lib/config/api';

export interface LowOccupancyTrip {
  tripId: string;
  label: string;
  occupancy: number;
}

export function useLowOccupancyTrips() {
  return useQuery<{
    lowOccupancyTrips: LowOccupancyTrip[];
    alerts: string[];
  }>({
    queryKey: ['low-occupancy-trips'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/admin/dashboard/low-occupancy-trips`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Erreur lors du chargement des voyages à faible taux d’occupation');
      return res.json();
    },
  });
}
