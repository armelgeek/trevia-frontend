import { createApiService } from '@/shared/lib/admin/admin-generator';
import type { Schedule } from './schedule.schema';
import { API_ENDPOINTS } from '@/shared/config/api';

export const scheduleService = createApiService<Schedule>(API_ENDPOINTS.schedule.base);
