import { z } from 'zod';
import { createField } from '@/lib/admin-generator';

export const tripSchema = z.object({
  id: createField.string({ label: 'ID' }),
  routeName: createField.string({ label: 'Nom route', display: { 
    showInTable: true,
    showInForm: false,
  }}),
  routeId: createField.relation('routes', 'name', false, { label: 'ID route', display: {
    showInForm: false,
    showInTable: false,
  } }),
  vehicleId: createField.relation('vehicles', 'registration', false, { label: 'ID véhicule', display: {
    showInForm: true,
    showInTable: false,
  } }),
  driverId: createField.relation('driver', 'driverName', false, { label: 'ID conducteur',display: {
    showInForm: false,
    showInTable: false, 
  } }),
  vehicleName: createField.string({ label: 'Nom véhicule' }),
  driverName: createField.string({ label: 'Nom conducteur' }),
  departureDate: createField.string({ label: 'Date de voyage', type: 'date' }),
  price: createField.string({ label: 'Prix' }),
  departureCity: createField.string({ label: 'Ville de départ',display: {
    showInForm: false,
    showInTable: false, 
  } }),
  arrivalCity: createField.string({ label: 'Ville d\'arrivée',display: {
    showInForm: false,
    showInTable: false, 
  }  }),
});

export type Trip = z.infer<typeof tripSchema>;
