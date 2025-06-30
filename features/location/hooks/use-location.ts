import { useQuery } from '@tanstack/react-query';
import { locationService } from '../location.service';

export function useDepartureCities() {
  return useQuery({
    queryKey: ['departure-cities'],
    queryFn: () => locationService.getDepartureCities(),
    select: (res) => res.data,
  });
}

export function useDestinations(city: string | undefined) {
  return useQuery({
    queryKey: ['destinations', city],
    queryFn: () => city ? locationService.getDestinations(city) : Promise.resolve({ data: [] }),
    enabled: !!city,
    select: (res) => res.data,
  });
}
