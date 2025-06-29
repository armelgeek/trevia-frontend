import { createApiService } from '@/shared/lib/admin/admin-generator';
import { Dashboard } from './dashboard.schema';

export const dashboardService = createApiService<Dashboard>("/api/admin/dashboard");
