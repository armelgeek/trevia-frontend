import { z } from 'zod';
import { createField } from '@/lib/admin-generator';

export const DriverSchema = z.object({
    id: createField.string({ label: 'ID' }).optional(),
    firstName: createField.string({ label: 'Prénom', placeholder: 'Prénom du conducteur', display: { showInForm: true, showInTable: false } }),
    lastName: createField.string({ label: 'Nom', placeholder: 'Nom du conducteur', display: { showInForm: true, showInTable: false } }),
    fullName: createField.string({ label: 'Nom complet', placeholder: 'Nom complet du conducteur', display: { showInForm: false, showInTable: true } }),
    license: createField.string({ label: 'Permis', placeholder: 'Numéro de permis' }),
    certifications: createField.list({ label: 'Certifications', placeholder: 'Certifications (CSV ou liste)', display: { showInForm: true, showInTable: false } }).optional(),
    phone: createField.string({ label: 'Téléphone', placeholder: 'Numéro de téléphone' }),
    status: createField.select([
        { value: 'active', label: 'Actif' },
        { value: 'inactive', label: 'Inactif' }
    ], { label: 'Statut', display: { showInForm: true, showInTable: false, widget: 'tag' } }),
    reviews: createField.string({
        label: 'Avis', display: {
            showInForm: true
            , showInTable: false
        }
    }),
});

export type Driver = z.infer<typeof DriverSchema>;
