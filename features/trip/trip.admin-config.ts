import { createAdminEntity, createApiService } from '@/lib/admin-generator';
import { tripSchema, Trip } from './trip.schema';

const tripService = createApiService<Trip>('/api/trips');

export const TripAdminConfig = createAdminEntity('Voyage', tripSchema, {
  title: 'Voyages',
  description: 'Gérez vos voyages',
  icon: '🧳',
  actions: { create: true, read: true, update: true, delete: true, bulk: false, export: false },
  services: tripService,
  queryKey: ['trips'],
  formFields: [
    'vehicleId',
    'routeId',
    'driverId',
    'departureDate',
    'arrivalDate',
    'price',
  ],
  parseData: (item) => ({
    ...item,
    departureDate:
      typeof item.departureDate === 'string' || typeof item.departureDate === 'number' || item.departureDate instanceof Date
        ? new Date(item.departureDate)
        : undefined,
    arrivalDate:
      item.arrivalDate
        ? new Date(item.arrivalDate)
        : undefined,
  }),
  children: [
    {
      route: '/:trip/seats',
      label: 'Voir les places',
      icon: '🪑',
    },
    {
      route: '/:trip/schedule',
      label: 'Ajouter un schedule',
      icon: '📅',
    },
  ],
});
