import { createAdminEntity, registerAdminEntity } from '@/shared/lib/admin/admin-generator';
import { VehicleSchema } from './vehicle.schema';
import { vehicleService } from './vehicle.service';

export const VehicleAdminConfig = createAdminEntity('Véhicule', VehicleSchema, {
  description: 'Gérez vos véhicules',
  icon: '🚐',
  actions: { create: true, read: true, update: true, delete: true, bulk: false},
  services: vehicleService,
  queryKey: ['vehicles'],
  formFields: ['model', 'registration', 'seatCount', 'type', 'equipment']
});

registerAdminEntity('vehicle', VehicleAdminConfig, '/admin/vehicle', '🚐');
