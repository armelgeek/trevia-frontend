import { useEntityQuery } from '@/shared/hooks/use-entity-query';
import { upcomingDeparturesService } from '../dashboard.services';

export interface Departure {
  scheduleId: string;
  tripId: string;
  routeLabel: string;
  departureTime: string;
  occupancy: number;
  status: string;
}

export interface UpcomingDeparturesResult {
  upcomingDepartures: Departure[];
}

export function useUpcomingDepartures(params?: Record<string, unknown>) {
  return useEntityQuery<UpcomingDeparturesResult>({
    service: upcomingDeparturesService,
    queryKey: ['dashboard', 'upcoming-departures', params?.period],
    params,
  });
}
