import { z } from 'zod';
import { createField } from '@/lib/admin-generator';

export const RouteSchema = z.object({
    departureCity: createField.string({ label: 'Ville de départ', display: { showInForm: true, showInTable: false } }),
    arrivalCity: createField.string({ label: "Ville d'arrivée", display: { showInForm: true, showInTable: false } }),
    routeLabel: createField.string({ label: 'Label de la route', placeholder: 'Ex: Paris - Lyon', display: { showInForm: true, showInTable: true } }),
    distanceKm: createField.string({ label: 'Distance (km)', display: { showInForm: true, showInTable: true } }),
    duration: createField.string({ label: 'Durée', display: { showInForm: true, showInTable: true } }),
    basePrice: createField.string({ label: 'Frais', display: { showInForm: true, showInTable: true } }),
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
