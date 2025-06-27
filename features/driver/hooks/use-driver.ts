import { useQuery } from '@tanstack/react-query';
import { driverService } from '../driver.service';

export function useDriver(filters?: Record<string, string | number | undefined>) {
  return useQuery({
    queryKey: ['drivers', filters],
    queryFn: () => driverService.fetchItems(filters),
  });
}
