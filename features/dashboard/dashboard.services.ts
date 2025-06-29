import { BaseService } from '@/shared/lib/services/base-service';
import { API_ENDPOINTS } from '@/shared/config/api';

export const cancelledTripsService = new BaseService(API_ENDPOINTS.dashboard.cancelledTrips);
export const upcomingDeparturesService = new BaseService(API_ENDPOINTS.dashboard.upcomingDepartures);
export const topDestinationsService = new BaseService(API_ENDPOINTS.dashboard.topDestinations);
export const cancelledDeparturesService = new BaseService(API_ENDPOINTS.dashboard.cancelledDepartures);
export const lowOccupancyTripsService = new BaseService(API_ENDPOINTS.dashboard.lowOccupancyTrips);
export const cancelledBookingsService = new BaseService(API_ENDPOINTS.dashboard.cancelledBookings);
export const recentBookingsService = new BaseService(API_ENDPOINTS.dashboard.recentBookings);
export const kpisService = new BaseService(API_ENDPOINTS.dashboard.kpis);
export const dashboardAlertsService = new BaseService(API_ENDPOINTS.dashboard.alerts);
