import { createAdminEntity, createApiService } from '@/lib/admin-generator';
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
    bulk: true,
    export: false
  },
  services: tripService,
  queryKey: ['trips'],
  parent: {
    key: 'trip',
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
      route: '/trip/:tripId/seats',
      label: 'Voir les places',
      icon: '🪑',
    },
    {
      route: '/trip/:tripId/schedule',
      label: 'Ajouter un schedule',
      icon: '📅',
    },
  ],
  bulkActions: [
    {
      key: 'export',
      label: 'Exporter',
      icon: null,
      variant: 'outline',
      onClick: async (ids) => {
        console.log('Exporting trips with IDs:', ids);
        // votre logique d’export avec les ids sélectionnés
      }
    }
  ]
});
