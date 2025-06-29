import { useEntityQuery } from '@/shared/hooks/use-entity-query';
import { cancelledDeparturesService } from '../dashboard.services';

export function useCancelledDepartures(params?: Record<string, unknown>) {
  return useEntityQuery({
    service: cancelledDeparturesService,
    queryKey: ['cancelled-departures'],
    params,
  });
}
