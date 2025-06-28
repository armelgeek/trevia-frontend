import { createApiService } from '@/lib/admin-generator';
import { Dashboard } from './dashboard.schema';

export const dashboardService = createApiService<Dashboard>("/api/admin/dashboard");
