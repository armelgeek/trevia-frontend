import { createAdminEntity, createApiService, registerAdminEntity } from '@/shared/lib/admin/admin-generator';
import { tripSchema, Trip } from './trip.schema';

const tripService = createApiService<Trip>('/api/trips');

export const TripAdminConfig = createAdminEntity('Voyage', tripSchema, {
  title: 'Voyages',
  description: 'Gérez vos voyages',
  icon: '🧳',
  actions: {
    create: true,
    read: true,
    update: true,
    delete: true,
    bulk: true
  },
  services: tripService,
  queryKey: ['trips'],
  parent: {
    key: 'trips',
    routeParam: 'tripId',
  },
  formFields: [
    'vehicleId',
    'routeId',
    'driverId',
    'departureDate',
    'arrivalDate',
    'price',
  ],
  children: [
    {
      route: '/trips/:tripId/seats',
      label: 'Voir les places',
      icon: '🪑',
    },
    {
      route: '/trips/:tripId/schedules',
      label: 'Ajouter un schedule',
      icon: '📅',
    },
  ]
});

registerAdminEntity('trips', TripAdminConfig, '/admin/trips', '🧳',3);
