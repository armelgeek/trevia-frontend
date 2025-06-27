import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../vehicle.service';

export function useVehicle() {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: () => vehicleService.list(),
  });
}
