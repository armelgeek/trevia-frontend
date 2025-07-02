import { useEntityQuery } from '@/shared/hooks/use-entity-query';
import { tripPopularityService } from '../trip-popularity.service';

export function usePopularTrips(params?: Record<string, string>) {
  return useEntityQuery({
    service: tripPopularityService,
    queryKey: ['popular-trips', params],
    params,
    enabled: true
  });
}
