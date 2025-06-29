import { createApiService } from '@/shared/lib/admin/admin-generator';
import { API_ENDPOINTS } from '@/shared/config/api';
import { Route } from './route.schema';

export const routeService = createApiService<Route>(API_ENDPOINTS.route.base);
