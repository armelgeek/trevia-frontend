import { createApiService } from '@/shared/lib/admin/admin-generator';
import { API_ENDPOINTS } from '@/shared/config/api';
import { Driver } from './driver.schema';

export const driverService = createApiService<Driver>(API_ENDPOINTS.driver.base);
