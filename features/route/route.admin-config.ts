import { createAdminEntity, registerAdminEntity } from '@/lib/admin-generator';
import { RouteSchema } from './route.schema';
import { routeService } from './route.service';
export const RouteAdminConfig = createAdminEntity('Route', RouteSchema, {
    description: 'Gérez vos routes',
    icon: '🛣️',
    actions: { create: true, read: true, update: true, delete: true, bulk: false},
    services: routeService,
    formFields: [
        'departureCity',
        'arrivalCity',
        'routeLabel',
        'distanceKm',
        'duration',
        'basePrice',
        'routeType',
        'status',
    ],
    queryKey: ['routes'],
});

registerAdminEntity('routes', RouteAdminConfig, '/admin/routes', '🛣️');
