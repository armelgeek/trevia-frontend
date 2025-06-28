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
  departureDate: createField.date({ label: 'Date de voyage', type: 'date', display:{
    format: (value: unknown) => {
      if (typeof value === 'string' && value !== '') {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          });
        }
        return value;
      }
      return '';
    }
  } }),
  price: createField.string({
    label: 'Prix',
    display: {
      prefix: '€ ',
      format: (value: unknown) => {
        if (typeof value === 'string' && value !== '') {
          const num = Number(value);
          return isNaN(num) ? value : `€ ${num.toFixed(2)}`;
        }
        return '';
      },
    }
  }),
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
