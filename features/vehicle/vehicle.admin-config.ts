import { createAdminEntity } from '@/lib/admin-generator';
import { VehicleSchema } from './vehicle.schema';
import { vehicleService } from './vehicle.service';

export const VehicleAdminConfig = createAdminEntity('Véhicule', VehicleSchema, {
  description: 'Gérez vos véhicules',
  icon: '🚐',
  actions: { create: true, read: true, update: true, delete: true, bulk: false, export: false },
  services: vehicleService,
  queryKey: ['vehicles'],
  formFields: ['model', 'registration', 'seatCount', 'type', 'equipment'],
});
