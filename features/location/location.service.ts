import BaseService from '@/shared/lib/services/base-service';
import { API_ENDPOINTS } from '@/shared/config/api';

const baseService = new BaseService();

export const locationService = {
  getDepartureCities: () =>
    baseService.get<string[]>(API_ENDPOINTS.locations.departureCities),
  getDestinations: (city: string) =>
    baseService.get<string[]>(API_ENDPOINTS.locations.destinations(city)),
};
