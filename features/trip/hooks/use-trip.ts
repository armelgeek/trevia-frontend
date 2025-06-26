import { useQuery } from '@tanstack/react-query';
import { tripService } from '../trip.service';

export function useTrip() {
  return useQuery({
    queryKey: ['trips'],
    queryFn: () => tripService.get(''),
  });
}
