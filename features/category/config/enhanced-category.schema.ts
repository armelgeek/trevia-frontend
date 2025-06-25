import { z } from 'zod';
import { createField, createAdminEntity } from '@/lib/admin-generator';

// Schéma Category amélioré avec métadonnées
export const EnhancedCategorySchema = z.object({
  id: createField.string({ 
    label: 'ID',
    display: { showInForm: false, showInTable: false, order: 0 }
  }).optional(),
  
  name: createField.string({ 
    label: 'Nom de la catégorie',
    placeholder: 'Entrez le nom de la catégorie',
    description: 'Le nom doit être unique et descriptif',
    display: { showInTable: true, showInForm: true, order: 1 }
  }),
  
  slug: createField.string({ 
    label: 'Slug',
    placeholder: 'url-friendly-name',
    description: 'Généré automatiquement à partir du nom',
    display: { showInTable: true, showInForm: false, order: 2 }
  }).optional(),
  
  description: createField.textarea({ 
    label: 'Description',
    placeholder: 'Décrivez cette catégorie...',
    description: 'Description détaillée de la catégorie',
    display: { showInTable: false, showInForm: true, order: 3 }
  }).optional(),
  
  status: createField.select(['active', 'inactive', 'archived'], {
    label: 'Statut',
    description: 'Statut de la catégorie',
    display: { showInTable: true, showInForm: true, order: 4 }
  }),
  
  featured: createField.boolean({
    label: 'Mise en avant',
    description: 'Afficher cette catégorie en vedette',
    display: { showInTable: true, showInForm: true, order: 5 }
  }).optional(),
  
  image: createField.image({
    label: 'Image',
    description: 'Image représentative de la catégorie',
    display: { showInTable: true, showInForm: true, order: 6 }
  }).optional(),
  
  parentCategory: createField.relation('categories', 'name', false, {
    label: 'Catégorie parente',
    description: 'Catégorie parent pour créer une hiérarchie',
    display: { showInTable: false, showInForm: true, order: 7 }
  }).optional(),
  
  sortOrder: createField.number({
    label: 'Ordre de tri',
    placeholder: '0',
    description: 'Ordre d\'affichage (plus petit = premier)',
    display: { showInTable: false, showInForm: true, order: 8 }
  }).optional(),
  
  createdAt: createField.date({
    label: 'Créé le',
    display: { showInForm: false, showInTable: true, order: 9 }
  }).optional(),
  
  updatedAt: createField.date({
    label: 'Modifié le',
    display: { showInForm: false, showInTable: false, order: 10 }
  }).optional(),
});

// Configuration admin automatique
export const CategoryAdminConfig = createAdminEntity(
  'Catégorie',
  EnhancedCategorySchema,
  {
    description: 'Gérez les catégories de produits',
    icon: 'folder',
    actions: {
      create: true,
      read: true,
      update: true,
      delete: true,
      bulk: true,
      export: true,
      import: false,
    },
    ui: {
      table: {
        defaultSort: 'sortOrder',
        pageSize: 15,
        defaultFilters: {
          status: 'active'
        }
      },
      form: {
        layout: 'sections',
        sections: [
          {
            title: 'Informations générales',
            fields: ['name', 'description', 'status']
          },
          {
            title: 'Présentation',
            fields: ['image', 'featured', 'sortOrder']
          },
          {
            title: 'Organisation',
            fields: ['parentCategory']
          }
        ]
      }
    },
    permissions: {
      roles: ['admin', 'manager'],
      conditions: {
        // Exemple : seuls les admins peuvent créer des catégories parentes
        createParent: 'admin'
      }
    }
  }
);

// Types TypeScript générés
export type EnhancedCategory = z.infer<typeof EnhancedCategorySchema>;
export type EnhancedCategoryPayload = z.infer<typeof EnhancedCategorySchema>;
