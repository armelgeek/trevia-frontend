import { createAdminEntity, createApiService } from '@/lib/admin-generator';
import { tripSchema } from './trip.schema';

export const TripAdminConfig = createAdminEntity('Voyage', tripSchema, {
  title: 'Voyages',
  description: 'Gérez vos voyages',
  icon: '🧳',
  actions: { create: true, read: true, update: true, delete: true, bulk: false, export: false },
  services: createApiService('/api/trips'),
  queryKey: ['trips']
});
