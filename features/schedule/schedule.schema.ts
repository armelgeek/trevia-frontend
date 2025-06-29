import { z } from 'zod';
import { createField } from '@/shared/lib/admin/admin-generator';

export const scheduleSchema = z.object({
  id: createField.string({ label: 'ID' }).optional(),
  departureTime: createField.string({ label: 'Départ', type: 'time', display: { showInForm: true, showInTable: true } }),
  arrivalTime: createField.string({ label: 'Arrivée', type: 'time', display: { showInForm: true, showInTable: true } }),
  status: createField.select([
    { value: 'scheduled', label: 'Planifié' },
    { value: 'in_progress', label: 'En cours' },
    { value: 'completed', label: 'Terminé' },
    { value: 'cancelled', label: 'Annulé' },
  ], { label: 'Statut', display: { showInForm: false, showInTable: false, widget: 'tag' } }).optional(),
 });

export type Schedule = z.infer<typeof scheduleSchema>;
