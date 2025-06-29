import { createApiService } from '@/shared/lib/admin/admin-generator';
import type { Booking } from './booking.schema';
import { API_ENDPOINTS } from '@/shared/lib/config/api';

export const bookingService = createApiService<Booking>(API_ENDPOINTS.bookings.base);
