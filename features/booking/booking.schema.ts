import { z } from 'zod';
import { createField } from '@/shared/lib/admin/admin-generator';

export const BookingSchema = z.object({

  id: createField.string({ label: 'ID', display: { showInForm: false } }),

  userFullName: createField.string({ label: 'Nom du client', display: { showInForm: false } }),
  userId: createField.string({ label: 'Utilisateur', display: { showInForm: false, showInTable: false } }),
  routeLabel: createField.string({ label: 'Voyage', display: { showInForm: false } }),
  seatNumbers: createField.string({ label: 'Place reservé', display: { showInForm: false } }),
  totalPrice: createField.string({ label: 'Total Payé', display: { showInForm: false } }),
  departureDate: createField.date({ label: 'Départ', display: { showInForm: false } }),
  tripId: createField.string({ label: 'Voyage', display: { showInForm: false, showInTable: false } }),
  status: z.enum(['pending', 'paid', 'cancelled']).describe(JSON.stringify({ label: 'Statut' })),
  vehicleId: createField.string({ label: 'Véhicule', display: { showInForm: false, showInTable: false } })
});

export type Booking = z.infer<typeof BookingSchema>;
