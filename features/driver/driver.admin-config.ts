import { createAdminEntity, registerAdminEntity } from '@/lib/admin-generator';
import { DriverSchema } from './driver.schema';
import { driverService } from './driver.service';


export const DriverAdminConfig = createAdminEntity('Conducteur', DriverSchema, {
  description: 'Gérez vos conducteurs',
  icon: '🚗',
  actions: { create: true, read: true, update: true, delete: true, bulk: false},
  services: driverService,
  formFields:[
    'firstName',
    'lastName',
    'license',
    'certifications',
    'reviews',
    'phone',
    'status',
  ],
  queryKey: ['drivers'],
  ui: {
    form: {
        layout: 'sections'
    }
  }
});

registerAdminEntity('drivers', DriverAdminConfig, '/admin/drivers', '🚗');
