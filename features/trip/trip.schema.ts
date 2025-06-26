import { z } from 'zod';
import { createField } from '@/lib/admin-generator';

export const tripSchema = z.object({
  id: createField.string({ label: 'Identifiant' }),
  departureCity: createField.string({ label: 'Ville de départ' }),
  arrivalCity: createField.string({ label: 'Ville d\'arrivée' }),
  departureDate: createField.string({ label: 'Date de départ', type: 'date' }),

  price: createField.number({ label: 'Prix' }),
  status: createField.select(['planned', 'ongoing', 'completed', 'cancelled'], { label: 'Statut' })
});

export type Trip = z.infer<typeof tripSchema>;
