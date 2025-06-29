import { createApiService } from '@/shared/lib/admin/admin-generator';
import type { Vehicle } from './vehicle.schema';
import { API_ENDPOINTS } from '@/shared/config/api';

export const vehicleService = createApiService<Vehicle>(API_ENDPOINTS.vehicle.base);
