import { createAdminEntity, createApiService } from '@/lib/admin-generator';
import { bookingSchema } from './booking.schema';

export const BookingAdminConfig = createAdminEntity('Réservations', bookingSchema, {
    description: 'Gérez vos réservations',
    icon: '📄',
    actions: { create: false, read: true, update: false, delete: false, bulk: false, export: false },
    services: createApiService('/api/bookings'),
    queryKey: ['bookings'],
});
