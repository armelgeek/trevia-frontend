import { BaseService } from '@/lib/base-service';
import { API_ENDPOINTS } from '@/shared/config/api';

export const userBookingService = new BaseService(
  API_ENDPOINTS.userBookings
);
