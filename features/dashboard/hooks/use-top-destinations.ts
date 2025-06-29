import { useEntityQuery } from '@/shared/hooks/use-entity-query';
import { topDestinationsService } from '../dashboard.services';

export interface TopDestination {
  routeId: string;
  routeLabel: string;
  bookings: number;
}

export interface TopDestinationsResult {
  topDestinations: TopDestination[];
}

export function useTopDestinations(params?: Record<string, unknown>) {
  return useEntityQuery<TopDestinationsResult>({
    service: topDestinationsService,
    queryKey: ['dashboard', 'top-destinations', params?.period],
    params,
  });
}
