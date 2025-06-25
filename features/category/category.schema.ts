import { z } from 'zod';
import { createField } from '@/lib/admin-generator';

export const CategorySchema = z.object({
  id: createField.string({ 
    label: 'ID',
    display: { showInForm: false, showInTable: false }
  }).optional(),
  name: createField.string({ 
    label: 'Nom de la catégorie',
    placeholder: 'Entrez le nom de la catégorie',
    description: 'Nom unique de la catégorie',
    display: { showInTable: true, showInForm: true, order: 1 }
  }),
  createdAt: createField.date({ 
    label: 'Créé le',
    display: { showInForm: false, showInTable: true, order: 2 }
  }).optional(),
  updatedAt: createField.date({ 
    label: 'Modifié le',
    display: { showInForm: false, showInTable: true, order: 3 }
  }).optional(),
});

export type Category = z.infer<typeof CategorySchema>;
