'use client';

import { z } from 'zod';
import { AdminPage } from '@/components/ui/admin-page';
import { createField, createAdminEntity, createMockService } from '@/lib/admin-generator';

const CategorySchema = z.object({
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

type Category = z.infer<typeof CategorySchema>;

// Données de test avec des types compatibles
const mockCategories: Category[] = [
  { id: '1', name: 'Électronique', createdAt: new Date('2024-01-15'), updatedAt: new Date('2024-01-15') },
  { id: '2', name: 'Vêtements', createdAt: new Date('2024-01-10'), updatedAt: new Date('2024-01-12') },
  { id: '3', name: 'Maison & Jardin', createdAt: new Date('2024-01-05'), updatedAt: new Date('2024-01-08') },
  { id: '4', name: 'Livres', createdAt: new Date('2024-01-01'), updatedAt: new Date('2024-01-03') },
];

// Création du service mock
const categoryService = createMockService(mockCategories);

// Configuration admin
const CategoryAdminConfig = createAdminEntity('Catégorie', CategorySchema, {
  description: 'Gérez vos catégories de produits',
  icon: '🏷️',
  
  ui: {
    table: {
      defaultSort: 'name',
    },
    form: {
      layout: 'simple',
    }
  },
  
  actions: {
    create: true,
    read: true,
    update: true, 
    delete: true,
    bulk: false,
    export: false,
  }
});

export default function CategoriesAdminPage() {

  return (
    <div className="space-y-6 px-3">
     
      <AdminPage<Category>
        config={CategoryAdminConfig}
        schema={CategorySchema}
        fetchItems={categoryService.fetchItems}
        createItem={categoryService.createItem}
        updateItem={categoryService.updateItem}
        deleteItem={categoryService.deleteItem}
        queryKey={['categories']}
      />
    </div>
  );
}
