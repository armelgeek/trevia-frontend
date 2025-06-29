import { useEntityQuery } from '@/shared/hooks/use-entity-query';
import { kpisService } from '../dashboard.services';

export interface Kpis {
  totalTrips?: number;
  totalBookings?: number;
  occupancyRate?: number;
  revenue?: number;
}

export function useKpis(params?: Record<string, unknown>) {
  return useEntityQuery<Kpis>({
    service: kpisService,
    queryKey: ['dashboard', 'kpis', params?.period],
    params,
  });
}
