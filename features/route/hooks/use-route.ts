import { useQuery } from '@tanstack/react-query';
import { routeService } from '../route.service';

export function useRoute(filters?: Record<string, string | number | undefined>) {
  return useQuery({
    queryKey: ['routes', filters],
    queryFn: () => routeService.fetchItems(filters),
  });
}
