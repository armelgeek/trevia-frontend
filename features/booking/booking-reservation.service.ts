import { BaseService } from '@/lib/base-service';
import { API_ENDPOINTS } from '@/shared/config/api';

export const bookingReservationService = new BaseService(API_ENDPOINTS.booking.reservation);
