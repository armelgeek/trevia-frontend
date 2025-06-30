import { z } from 'zod';
import { createField } from '@/shared/lib/admin/admin-generator';

export const RouteSchema = z.object({
    departureCity: createField.string({ label: 'Ville de départ', display: { showInForm: true, showInTable: false } }),
    arrivalCity: createField.string({ label: "Ville d'arrivée", display: { showInForm: true, showInTable: false } }),
    routeLabel: createField.string({ label: 'Route', placeholder: 'Ex: Paris - Lyon', display: { showInForm: false, showInTable: true } }).optional(),
    distanceKm: createField.string({
        label: 'Distance', display: {
            showInForm: true,
            showInTable: true,
            suffix: ' KM'
        }
    }),
    duration: createField.string({ label: 'Durée', type: 'time', display: { showInForm: true, showInTable: true } }),
    basePrice: createField.string({
        label: 'Frais', display: {
            showInForm: true,
            showInTable: true,
            prefix: '€ ',
            format: (value: unknown) => {
                if (typeof value === 'string' && value !== '') {
                    const num = Number(value);
                    return isNaN(num) ? value : `€ ${num.toFixed(2)}`;
                }
                return '';
            }
        }
    }),
    routeType: createField.select([
        { value: 'national', label: 'Nationale' },
        { value: 'regional', label: 'Régionale' },
    ], { label: 'Type de route', display: { showInForm: true, showInTable: true } }),
    status: createField.select([
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
    ], { label: 'Statut', display: { showInForm: true, showInTable: false } })
});

export type Route = z.infer<typeof RouteSchema>;
