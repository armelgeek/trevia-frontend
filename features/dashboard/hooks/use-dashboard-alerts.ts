import { useEntityQuery } from '@/shared/hooks/use-entity-query';
import { dashboardAlertsService } from '../dashboard.services';

export function useDashboardAlerts(params?: Record<string, unknown>) {
  return useEntityQuery({
    service: dashboardAlertsService,
    queryKey: ['dashboard-alerts'],
    params,
  });
}
