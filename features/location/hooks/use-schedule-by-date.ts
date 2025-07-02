
import { useEntityQuery } from '@/shared/hooks/use-entity-query';
import { scheduleByDateService } from '../schedule-by-date.service';

export function useSchedulesByDate(date: string) {
  return useEntityQuery({
    service: scheduleByDateService,
    queryKey: ['schedules-by-date', date],
    params: { date },
    enabled: !!date,
    select: (res) => Array.isArray(res) ? res : [],
  });
}
