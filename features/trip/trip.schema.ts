import { z } from 'zod';
import { createField } from '@/lib/admin-generator';

export const tripSchema = z.object({
  id: createField.string({ label: 'ID' }).optional(),
  routeName: createField.string({
    label: 'Nom route', display: {
      showInTable: true,
      showInForm: false,
    }
  }).optional(),
  vehicleId: createField.relation('vehicles', 'model', false, {
    label: 'Véhicule', display: {
      showInForm: true,
      showInTable: false,
    }
  }),
  routeId: createField.relation('routes', 'routeLabel', false, {
    label: 'Route', display: {
      showInForm: true,
      showInTable: false,
      widget: 'radio',
    }
  }),
  driverId: createField.relation('drivers', 'fullName', false, {
    label: 'Conducteur', display: {
      showInForm: true,
      showInTable: false,
      widget: 'tag',
    }
  }),
  departureDate: createField.date({ label: 'Date de voyage', type: 'date' }),
  arrivalDate: createField.date({ label: 'Date d\'arrivée', type: 'date', display: {
    showInForm: false,
    showInTable: false,
  }}).optional(),
  price: createField.string({ label: 'Prix' }),
  departureCity: createField.string({
    label: 'Ville de départ', display: {
      showInForm: false,
      showInTable: false,
    }
  }).optional(),
  arrivalCity: createField.string({
    label: 'Ville d\'arrivée', display: {
      showInForm: false,
      showInTable: false,
    }
  }).optional()
})

export type Trip = z.infer<typeof tripSchema>;
