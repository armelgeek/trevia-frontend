import { useQuery } from '@tanstack/react-query';
import { scheduleService } from '../schedule.service';

export function useSchedule() {
  return useQuery({
    queryKey: ['schedules'],
    queryFn: () => scheduleService.fetchItems(),
  });
}
