import BaseService from '@/shared/lib/services/base-service';
import { API_ENDPOINTS } from '@/shared/config/api';

export const tripService = new BaseService(API_ENDPOINTS.trip.base);
export const tripSeatsService = new BaseService(API_ENDPOINTS.trip.seats);
