import { z } from 'zod';
import { createField } from '@/shared/lib/admin/admin-generator';

export const VehicleSchema = z.object({
  id: createField.string({ label: 'ID', display: { showInForm: false } }),
  model: createField.string({ label: 'Modèle', display: { showInForm: true } }),
  registration: createField.string({ label: 'Immatriculation', display: { showInForm: true } }),
  seatCount: createField.string({ label: 'Capacité', display: { showInForm: true } }),
  type: createField.select(['Mini bus', 'car'], { label: 'Type', display: { widget: 'tag', showInForm: true } }),
  equipment: createField.list({ label: 'Équipements', display: { showInForm: true } }),
});

export type Vehicle = z.infer<typeof VehicleSchema>;
