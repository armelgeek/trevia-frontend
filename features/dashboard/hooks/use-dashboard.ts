import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../dashboard.service';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardService.get(''),
  });
}
