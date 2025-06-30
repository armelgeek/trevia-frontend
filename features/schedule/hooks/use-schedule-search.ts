import { useQuery } from '@tanstack/react-query';
import { scheduleSearchService } from '../schedule-search.service';
import type { SearchSchedulesQuery, SearchSchedulesResponse } from '../schedule-search.schema';

export function useScheduleSearch(params: SearchSchedulesQuery, enabled = true) {
  return useQuery<SearchSchedulesResponse>({
    queryKey: ['schedules-search', params],
    queryFn: async () => {
      const res = await scheduleSearchService.get<SearchSchedulesResponse>('', params);
      return res.data;
    },
    enabled,
  });
}
